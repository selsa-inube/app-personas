import { Select } from "@design/input/Select";
import { TextField } from "@design/input/TextField";
import { Grid } from "@design/layout/Grid";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { FormikValues } from "formik";
import { MdOutlineModeEdit } from "react-icons/md";
import { activeDM } from "src/model/domains/general/activedm";
import { educationLevelTypeDM } from "src/model/domains/personalInformation/educationLeveldm";
import { vulnerablePopulationTypeDM } from "src/model/domains/personalInformation/vulnerablePopulationdm";

interface PersonalSocioEconomicInformationFormUIProps {
  formik: FormikValues;
  loading?: boolean;
}

function PersonalSocioEconomicInformationFormUI(
  props: PersonalSocioEconomicInformationFormUIProps
) {
  const { formik, loading } = props;

  function stateValue(attribute: string) {
    if (!formik.touched[attribute]) return "pending";
    if (formik.touched[attribute] && formik.errors[attribute]) return "invalid";
    return "valid";
  }

  const isMobile = useMediaQuery("(max-width: 750px)");
  const isTablet = useMediaQuery("(max-width: 1100px)");

  return (
    <form>
      <Grid
        templateColumns={
          isMobile ? "1fr" : isTablet ? "1fr 1fr" : "1fr 1fr 1fr"
        }
        gap={isMobile ? "s150" : isTablet ? "s200" : "s300"}
      >
         <Select
          label="Nivel de estudios"
          name="educationLevel"
          id="educationLevel"
          value={formik.values.educationLevel}
          size="compact"
          options={educationLevelTypeDM.options}
          handleChange={formik.handleChange}
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
          handleChange={formik.handleChange}
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
          handleChange={formik.handleChange}
          isDisabled={loading}
          isFullWidth
        />
        <TextField
          label="Número de personas a cargo"
          placeholder="Digite el numero de personas a cargo"
          name="dependants"
          id="dependants"
          value={formik.values.dependants}
          type="number"
          iconAfter={<MdOutlineModeEdit size={18} />}
          isDisabled={loading}
          size="compact"
          handleBlur={formik.handleBlur}
          handleChange={formik.handleChange}
          isFullWidth
        />
        <Select
          label="Población vulnerable"
          name="vulnerablePopulation"
          id="vulnerablePopulation"
          value={formik.values.vulnerablePopulation}
          size="compact"
          options={vulnerablePopulationTypeDM.options}
          handleChange={formik.handleChange}
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
          handleChange={formik.handleChange}
          isDisabled={loading}
          isFullWidth
        />
        <Select
          label="¿Declara renta?"
          name="isDeclaredIncome"
          id="isDeclaredIncome"
          value={formik.values.isDeclaredIncome}
          size="compact"
          options={activeDM.options}
          handleChange={formik.handleChange}
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
          handleChange={formik.handleChange}
          isDisabled={loading}
          isFullWidth
        />
      </Grid>
    </form>
  );
}

export { PersonalSocioEconomicInformationFormUI };
