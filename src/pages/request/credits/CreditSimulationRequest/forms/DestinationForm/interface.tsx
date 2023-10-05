import { Grid } from "@design/layout/Grid";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { FormikValues } from "formik";

interface DestinationFormUIProps {
  formik: FormikValues;
  loading?: boolean;
}

function DestinationFormUI(props: DestinationFormUIProps) {
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
       
      </Grid>
    </form>
  );
}

export { DestinationFormUI };

