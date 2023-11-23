import { Select } from "@design/input/Select";
import { TextField } from "@design/input/TextField";
import { Grid } from "@design/layout/Grid";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { FormikValues } from "formik";
import { MdOutlineModeEdit } from "react-icons/md";
import { activeDM } from "src/model/domains/general/activedm";
import { educationLevelTypeDM } from "src/model/domains/socioeconomicInformation/educationLeveldm";
import { vulnerablePopulationTypeDM } from "src/model/domains/socioeconomicInformation/vulnerablePopulationdm";

interface SocioeconomicInformationFormUIProps {
  formik: FormikValues;
  loading?: boolean;
  customHandleBlur: (event: React.FocusEvent<HTMLElement, Element>) => void;
}

function SocioeconomicInformationFormUI(
  props: SocioeconomicInformationFormUIProps
) {
  const { formik, loading, customHandleBlur } = props;

  const stateValue = (fieldName: string) => {
    if (!formik.touched[fieldName]) return "pending";
    if (formik.touched[fieldName] && formik.errors[fieldName]) return "invalid";
    return "valid";
  };

  const isMobile = useMediaQuery("(max-width: 700px)");
  const isTablet = useMediaQuery("(max-width: 1200px)");

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
          placeholder="Digite el número de personas a cargo"
          name="dependants"
          id="dependants"
          value={formik.values.dependants}
          errorMessage={formik.errors.dependants}
          type="number"
          iconAfter={<MdOutlineModeEdit size={18} />}
          state={stateValue("dependants")}
          isDisabled={loading}
          size="compact"
          handleBlur={customHandleBlur}
          handleChange={formik.handleChange}
          validMessage="El número ingresado es correcto"
          isFullWidth
          isRequired
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
          name="isDeclaredIncomes"
          id="isDeclaredIncomes"
          value={formik.values.isDeclaredIncomes}
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

export { SocioeconomicInformationFormUI };
