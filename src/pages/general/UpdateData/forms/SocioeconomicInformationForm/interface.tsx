import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Button, Grid, Select, Stack, Textfield } from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { activeDM } from "src/model/domains/general/activedm";
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
            placeholder="Selecciona una opción"
            value={formik.values.educationLevel}
            size="compact"
            options={educationLevelTypeDM.options}
            onChange={(name, value) => formikHandleChange(name, value, formik)}
            disabled={loading}
            fullwidth
          />
          <Select
            label="Responsable del hogar"
            name="isResponsibleHome"
            id="isResponsibleHome"
            placeholder="Selecciona una opción"
            value={formik.values.isResponsibleHome}
            size="compact"
            options={activeDM.options}
            onChange={(name, value) => formikHandleChange(name, value, formik)}
            disabled={loading}
            fullwidth
          />
          <Select
            label="Mujer cabeza de familia"
            name="isSingleMother"
            id="isSingleMother"
            placeholder="Selecciona una opción"
            value={formik.values.isSingleMother}
            size="compact"
            options={activeDM.options}
            onChange={(name, value) => formikHandleChange(name, value, formik)}
            disabled={loading}
            fullwidth
          />
          <Textfield
            label="Número de personas a cargo"
            placeholder="Digite el número de personas a cargo"
            name="dependants"
            id="dependants"
            value={formik.values.dependants}
            message={formik.errors.dependants}
            type="number"
            status={getFieldState(formik, "dependants")}
            disabled={loading}
            size="compact"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            fullwidth
          />
          <Select
            label="Población vulnerable"
            name="vulnerablePopulation"
            id="vulnerablePopulation"
            placeholder="Selecciona una opción"
            value={formik.values.vulnerablePopulation}
            size="compact"
            options={vulnerablePopulationTypeDM.options}
            onChange={(name, value) => formikHandleChange(name, value, formik)}
            disabled={loading}
            fullwidth
          />
          <Select
            label="Públicamente expuesto"
            name="isPublicExposed"
            id="isPublicExposed"
            placeholder="Selecciona una opción"
            value={formik.values.isPublicExposed}
            size="compact"
            options={activeDM.options}
            onChange={(name, value) => formikHandleChange(name, value, formik)}
            disabled={loading}
            fullwidth
          />
          <Select
            label="¿Declara renta?"
            name="isDeclaredIncomes"
            id="isDeclaredIncomes"
            placeholder="Selecciona una opción"
            value={formik.values.isDeclaredIncomes}
            size="compact"
            options={activeDM.options}
            onChange={(name, value) => formikHandleChange(name, value, formik)}
            disabled={loading}
            fullwidth
          />
          <Select
            label="¿Administra recursos públicos?"
            name="isPublicOfficials"
            id="isPublicOfficials"
            placeholder="Selecciona una opción"
            value={formik.values.isPublicOfficials}
            size="compact"
            options={activeDM.options}
            onChange={(name, value) => formikHandleChange(name, value, formik)}
            disabled={loading}
            fullwidth
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
