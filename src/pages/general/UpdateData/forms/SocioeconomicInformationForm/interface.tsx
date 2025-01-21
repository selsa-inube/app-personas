import { Select } from "@design/input/Select";
import { TextField } from "@design/input/TextField";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Button } from "@inubekit/button";
import { Grid, Stack } from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { MdOutlineModeEdit } from "react-icons/md";
import { activeDM } from "src/model/domains/general/activedm";
import { educationLevelTypeDM } from "src/model/domains/general/updateData/socioeconomicInformation/educationLeveldm";
import { vulnerablePopulationTypeDM } from "src/model/domains/general/updateData/socioeconomicInformation/vulnerablePopulationdm";
import { getFieldState } from "src/utils/forms/forms";
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

  const isMobile = useMediaQuery("(max-width: 700px)");
  const isTablet = useMediaQuery("(max-width: 1200px)");

  return (
    <form>
      <Stack direction="column" gap={inube.spacing.s300}>
        <Grid
          templateColumns={`repeat(${isMobile ? 1 : isTablet ? 2 : 3}, 1fr)`}
          autoRows="auto"
          gap={
            isMobile
              ? inube.spacing.s150
              : isTablet
                ? inube.spacing.s200
                : inube.spacing.s300
          }
        >
          <Select
            label="Nivel de estudios"
            name="educationLevel"
            id="educationLevel"
            value={formik.values.educationLevel}
            size="compact"
            options={educationLevelTypeDM.options}
            onChange={formik.handleChange}
            isDisabled={loading}
            isFullWidth
          />
          <Select
            label="Responsable del hogar"
            name="isResponsibleHome"
            id="isResponsibleHome"
            value={formik.values.isResponsibleHome}
            size="compact"
            options={activeDM.options}
            onChange={formik.handleChange}
            isDisabled={loading}
            isFullWidth
          />
          <Select
            label="Mujer cabeza de familia"
            name="isSingleMother"
            id="isSingleMother"
            value={formik.values.isSingleMother}
            size="compact"
            options={activeDM.options}
            onChange={formik.handleChange}
            isDisabled={loading}
            isFullWidth
          />
          <TextField
            label="Número de personas a cargo"
            placeholder="Digite el número de personas a cargo"
            name="dependants"
            id="dependants"
            value={formik.values.dependants}
            errorMessage={formik.errors.dependants}
            type="number"
            iconAfter={<MdOutlineModeEdit size={18} />}
            state={getFieldState(formik, "dependants")}
            isDisabled={loading}
            size="compact"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            isFullWidth
          />
          <Select
            label="Población vulnerable"
            name="vulnerablePopulation"
            id="vulnerablePopulation"
            value={formik.values.vulnerablePopulation}
            size="compact"
            options={vulnerablePopulationTypeDM.options}
            onChange={formik.handleChange}
            isDisabled={loading}
            isFullWidth
          />
          <Select
            label="Públicamente expuesto"
            name="isPublicExposed"
            id="isPublicExposed"
            value={formik.values.isPublicExposed}
            size="compact"
            options={activeDM.options}
            onChange={formik.handleChange}
            isDisabled={loading}
            isFullWidth
          />
          <Select
            label="¿Declara renta?"
            name="isDeclaredIncomes"
            id="isDeclaredIncomes"
            value={formik.values.isDeclaredIncomes}
            size="compact"
            options={activeDM.options}
            onChange={formik.handleChange}
            isDisabled={loading}
            isFullWidth
          />
          <Select
            label="¿Administra recursos públicos?"
            name="isPublicOfficials"
            id="isPublicOfficials"
            value={formik.values.isPublicOfficials}
            size="compact"
            options={activeDM.options}
            onChange={formik.handleChange}
            isDisabled={loading}
            isFullWidth
          />
        </Grid>
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
