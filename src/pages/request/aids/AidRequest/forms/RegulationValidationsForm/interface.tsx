import { ValidationCard } from "@components/cards/ValidationCard";
import { Grid } from "@design/layout/Grid";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { FormikProps } from "formik";
import { IRegulationValidationsEntry } from "./types";

interface RegulationValidationsFormUIProps {
  formik: FormikProps<IRegulationValidationsEntry>;
}

function RegulationValidationsFormUI(props: RegulationValidationsFormUIProps) {
  const { formik } = props;

  const isTablet = useMediaQuery("(max-width: 1100px)");

  return (
    <Grid
      templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
      gap="s200"
      width="100%"
    >
      {formik.values.validations.map((validation) => (
        <ValidationCard
          id={validation.id}
          label={validation.label}
          failDetails={validation.failDetails}
          value={validation.value}
          key={validation.id}
        />
      ))}
    </Grid>
  );
}

export { RegulationValidationsFormUI };
