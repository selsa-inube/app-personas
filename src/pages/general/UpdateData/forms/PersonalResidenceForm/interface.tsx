import { Select } from "@design/input/Select";
import { TextField } from "@design/input/TextField";
import { Grid } from "@design/layout/Grid";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { FormikValues } from "formik";
import { getDomainById } from "@mocks/domains/domainService.mocks";

interface PersonalResidenceFormUIProps {
  formik: FormikValues;
  loading?: boolean;
}

function PersonalResidenceFormUI(props: PersonalResidenceFormUIProps) {
  const { formik, loading } = props;

  function stateValue(attribute: string) {
    if (!formik.touched[attribute]) return "pending";
    if (formik.touched[attribute] && formik.errors[attribute]) return "invalid";
    return "valid";
  }

  const isMobile = useMediaQuery("(max-width: 750px)");

  return (
    <form>
      <Grid
        templateColumns={isMobile ? "1fr" : "1fr 1fr "}
        gap={isMobile ? "s200" : "s300"}
      >
        <Select
          label="Tipo de vivienda"
          name="type"
          id="type"
          value={formik.values.type}
          isFullWidth
          options={getDomainById("personalResidenceType")}
          handleBlur={formik.handleBlur}
          isDisabled={loading}
          state={stateValue("type")}
          handleChange={formik.handleChange}
        />
        <Select
          label="Estrato de la vivienda"
          name="stratum"
          id="stratum"
          value={formik.values.stratum}
          isFullWidth
          options={getDomainById("stratum")}
          handleBlur={formik.handleBlur}
          isDisabled={loading}
          state={stateValue("stratum")}
          handleChange={formik.handleChange}
        />
      </Grid>
    </form>
  );
}

export { PersonalResidenceFormUI };
