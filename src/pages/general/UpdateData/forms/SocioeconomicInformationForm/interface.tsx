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
import { IServiceDomains } from "src/context/app/types";
import { formikHandleChange, getFieldState } from "src/utils/forms/forms";
import { ISocioeconomicInformationEntry } from "./types";

interface SocioeconomicInformationFormUIProps {
  formik: FormikProps<ISocioeconomicInformationEntry>;
  loading?: boolean;
  serviceDomains: IServiceDomains;
  withSubmit?: boolean;
}

function SocioeconomicInformationFormUI(
  props: SocioeconomicInformationFormUIProps,
) {
  const { formik, loading, serviceDomains, withSubmit } = props;

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
            name="schoolingLevelCode"
            id="schoolingLevelCode"
            placeholder="Selecciona una opción"
            size="compact"
            value={formik.values.schoolingLevelCode}
            options={serviceDomains.schoolinglevel}
            onChange={(name, value) => formikHandleChange(name, value, formik)}
            disabled={loading}
            fullwidth
          />
          <Numberfield
            label="Número de personas a cargo"
            placeholder="Número de personas a cargo"
            name="numberPersonsInCharge"
            id="numberPersonsInCharge"
            size="compact"
            value={formik.values.numberPersonsInCharge}
            message={formik.errors.numberPersonsInCharge}
            status={getFieldState(formik, "numberPersonsInCharge")}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            disabled={loading}
            type="number"
            fullwidth
          />
          <Select
            label="Grupo protección especial"
            name="vulnerableProtectionGroupCode"
            id="vulnerableProtectionGroupCode"
            placeholder="Selecciona una opción"
            size="compact"
            value={formik.values.vulnerableProtectionGroupCode}
            options={serviceDomains.vulnerableprotectiongroup}
            onChange={(name, value) => formikHandleChange(name, value, formik)}
            disabled={loading}
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
            <Box
              padding={`${inube.spacing.s100} ${inube.spacing.s200}`}
              key={"responsibleOfHousehold"}
            >
              <Stack justifyContent="space-between" gap={inube.spacing.s200}>
                <Text type="body" size="medium">
                  Soy responsable de mi hogar
                </Text>
                <Checkbox
                  id="responsibleOfHousehold"
                  name="responsibleOfHousehold"
                  value={formik.values.responsibleOfHousehold}
                  checked={
                    formik.values.responsibleOfHousehold === "Y" ? true : false
                  }
                  onChange={(e) => {
                    const checked = e.target.checked;
                    formik.setFieldValue(
                      "responsibleOfHousehold",
                      checked ? "Y" : "N",
                    );
                  }}
                  disabled={loading}
                />
              </Stack>
            </Box>
            <Box
              padding={`${inube.spacing.s100} ${inube.spacing.s200}`}
              key={"womanHeadOfHousehold"}
            >
              <Stack justifyContent="space-between" gap={inube.spacing.s200}>
                <Text type="body" size="medium">
                  Soy mujer cabeza de familia
                </Text>
                <Checkbox
                  id="womanHeadOfHousehold"
                  name="womanHeadOfHousehold"
                  value={formik.values.womanHeadOfHousehold}
                  checked={formik.values.womanHeadOfHousehold === "Y"}
                  indeterminate={false}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    formik.setFieldValue(
                      "womanHeadOfHousehold",
                      checked ? "Y" : "N",
                    );
                  }}
                  disabled={loading}
                />
              </Stack>
            </Box>
            <Box
              padding={`${inube.spacing.s100} ${inube.spacing.s200}`}
              key={"publiclyExposed"}
            >
              <Stack justifyContent="space-between" gap={inube.spacing.s200}>
                <Text type="body" size="medium">
                  Estoy públicamente expuesto
                </Text>
                <Checkbox
                  id="publiclyExposed"
                  name="publiclyExposed"
                  value={formik.values.publiclyExposed}
                  checked={formik.values.publiclyExposed === "Y"}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    formik.setFieldValue(
                      "publiclyExposed",
                      checked ? "Y" : "N",
                    );
                  }}
                  disabled={loading}
                />
              </Stack>
            </Box>
            <Box
              padding={`${inube.spacing.s100} ${inube.spacing.s200}`}
              key={"incomeTax"}
            >
              <Stack justifyContent="space-between" gap={inube.spacing.s200}>
                <Text type="body" size="medium">
                  Estoy sujeto a declaración de renta
                </Text>
                <Checkbox
                  id="incomeTax"
                  name="incomeTax"
                  value={formik.values.incomeTax}
                  checked={formik.values.incomeTax === "Y" ? true : false}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    formik.setFieldValue("incomeTax", checked ? "Y" : "N");
                  }}
                  disabled={loading}
                />
              </Stack>
            </Box>
            <Box
              padding={`${inube.spacing.s100} ${inube.spacing.s200}`}
              key={"publicResourcesAdministration"}
            >
              <Stack justifyContent="space-between" gap={inube.spacing.s200}>
                <Text type="body" size="medium">
                  Administro recursos públicos
                </Text>
                <Checkbox
                  id="publicResourcesAdministration"
                  name="publicResourcesAdministration"
                  value={formik.values.publicResourcesAdministration}
                  checked={
                    formik.values.publicResourcesAdministration === "Y"
                      ? true
                      : false
                  }
                  onChange={(e) => {
                    const checked = e.target.checked;
                    formik.setFieldValue(
                      "publicResourcesAdministration",
                      checked ? "Y" : "N",
                    );
                  }}
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
