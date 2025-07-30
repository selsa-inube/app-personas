import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import {
  Box,
  Button,
  Checkbox,
  Grid,
  Numberfield,
  Select,
  Stack,
  Text,
} from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { educationLevelTypeDM } from "src/model/domains/general/updateData/socioeconomicInformation/educationLeveldm";
import { vulnerablePopulationTypeDM } from "src/model/domains/general/updateData/socioeconomicInformation/vulnerablePopulationdm";
import { formikHandleChange, getFieldState } from "src/utils/forms/forms";
import { ISocioeconomicInformationEntry } from "./types";

interface SocioeconomicInformationFormUIProps {
  formik: FormikProps<ISocioeconomicInformationEntry>;
  loading?: boolean;
  withSubmit?: boolean;
}

function SocioeconomicInformationFormUI(
  props: SocioeconomicInformationFormUIProps,
) {
  const { formik, loading, withSubmit } = props;

  const isMobile = useMediaQuery("(max-width: 770px)");

  return (
    <form>
      <Stack direction="column" gap={inube.spacing.s400}>
        <Grid
          templateColumns={`repeat(${isMobile ? 1 : 2}, 1fr)`}
          autoRows="auto"
          gap={inube.spacing.s200}
        >
          <Select
            label="Nivel de estudios"
            name="educationLevel"
            id="educationLevel"
            placeholder="Selecciona una opción"
            size="compact"
            value={formik.values.educationLevel}
            options={educationLevelTypeDM.options}
            onChange={(name, value) => formikHandleChange(name, value, formik)}
            disabled={loading}
            required
            fullwidth
          />
          <Numberfield
            label="Número de personas a cargo"
            placeholder="Número de personas a cargo"
            name="dependants"
            id="dependants"
            size="compact"
            value={formik.values.dependants}
            message={formik.errors.dependants}
            status={getFieldState(formik, "dependants")}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            disabled={loading}
            required
            fullwidth
          />
          <Select
            label="Grupo protección especial"
            name="vulnerablePopulation"
            id="vulnerablePopulation"
            placeholder="Selecciona una opción"
            size="compact"
            value={formik.values.vulnerablePopulation}
            options={vulnerablePopulationTypeDM.options}
            onChange={(name, value) => formikHandleChange(name, value, formik)}
            disabled={loading}
            required
            fullwidth
          />
        </Grid>
        <Stack direction="column" gap={inube.spacing.s200} width="100%">
          <Text
            type="label"
            size="large"
            weight="bold"
            appearance="gray"
            margin="0px 16px"
          >
            Selecciona las opciones que apliquen a tu situación actual.
          </Text>
          <Grid
            templateColumns={`repeat(${isMobile ? 1 : 2}, 1fr)`}
            autoRows="auto"
            gap={inube.spacing.s200}
          >
            <Box padding={`${inube.spacing.s100} ${inube.spacing.s200}`}>
              <Stack justifyContent="space-between" gap={inube.spacing.s200}>
                <Text type="body" size="medium">
                  Soy responsable de mi hogar
                </Text>
                <Checkbox
                  id="isResponsibleHome"
                  name="isResponsibleHome"
                  value="true"
                  checked={formik.values.isResponsibleHome}
                  onChange={formik.handleChange}
                  disabled={loading}
                />
              </Stack>
            </Box>
            <Box padding={`${inube.spacing.s100} ${inube.spacing.s200}`}>
              <Stack justifyContent="space-between" gap={inube.spacing.s200}>
                <Text type="body" size="medium">
                  Soy mujer cabeza de familia
                </Text>
                <Checkbox
                  id="isSingleMother"
                  name="isSingleMother"
                  value="true"
                  checked={formik.values.isSingleMother}
                  onChange={formik.handleChange}
                  disabled={loading}
                />
              </Stack>
            </Box>
            <Box padding={`${inube.spacing.s100} ${inube.spacing.s200}`}>
              <Stack justifyContent="space-between" gap={inube.spacing.s200}>
                <Text type="body" size="medium">
                  Estoy públicamente expuesto
                </Text>
                <Checkbox
                  id="isPublicExposed"
                  name="isPublicExposed"
                  value="true"
                  checked={formik.values.isPublicExposed}
                  onChange={formik.handleChange}
                  disabled={loading}
                />
              </Stack>
            </Box>
            <Box padding={`${inube.spacing.s100} ${inube.spacing.s200}`}>
              <Stack justifyContent="space-between" gap={inube.spacing.s200}>
                <Text type="body" size="medium">
                  Estoy sujeto a declaración de renta
                </Text>
                <Checkbox
                  id="isDeclaredIncomes"
                  name="isDeclaredIncomes"
                  value="true"
                  checked={formik.values.isDeclaredIncomes}
                  onChange={formik.handleChange}
                  disabled={loading}
                />
              </Stack>
            </Box>
            <Box padding={`${inube.spacing.s100} ${inube.spacing.s200}`}>
              <Stack justifyContent="space-between" gap={inube.spacing.s200}>
                <Text type="body" size="medium">
                  Administro recursos públicos
                </Text>
                <Checkbox
                  id="isPublicOfficials"
                  name="isPublicOfficials"
                  value="true"
                  checked={formik.values.isPublicOfficials}
                  onChange={formik.handleChange}
                  disabled={loading}
                />
              </Stack>
            </Box>
          </Grid>
        </Stack>
        {withSubmit && (
          <Stack gap={inube.spacing.s150} justifyContent="flex-end">
            <Button
              onClick={() => formik.handleReset()}
              type="button"
              disabled={loading || !formik.dirty}
              spacing="compact"
              variant="outlined"
              appearance="gray"
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              spacing="compact"
              disabled={loading || !formik.dirty || !formik.isValid}
            >
              Guardar
            </Button>
          </Stack>
        )}
      </Stack>
    </form>
  );
}

export { SocioeconomicInformationFormUI };
