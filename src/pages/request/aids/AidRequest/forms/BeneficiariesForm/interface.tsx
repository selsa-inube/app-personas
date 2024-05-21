import { Fieldset } from "@design/input/Fieldset";
import { RadioCard } from "@design/input/RadioCard";
import { Grid } from "@design/layout/Grid";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { FormikProps } from "formik";
import { IBeneficiariesEntry } from "./types";

interface BeneficiariesFormUIProps {
  formik: FormikProps<IBeneficiariesEntry>;
  onSelectBeneficiary: (id: string) => void;
}

function BeneficiariesFormUI(props: BeneficiariesFormUIProps) {
  const { formik, onSelectBeneficiary } = props;

  const isTablet = useMediaQuery("(max-width: 1100px)");
  const isMobile = useMediaQuery("(max-width: 750px)");

  return (
    <Fieldset title="Posibles beneficiarios">
      <Grid
        templateColumns={`repeat(${isMobile ? 1 : isTablet ? 2 : 3}, 1fr)`}
        gap="s200"
      >
        {formik.values.beneficiaries.map((beneficiary) => (
          <RadioCard
            id={beneficiary.identificationNumber}
            name={beneficiary.identificationNumber}
            key={beneficiary.identificationNumber}
            size="compact"
            appearance="gray"
            title={beneficiary.name}
            description={`${beneficiary.identificationType} ${beneficiary.identificationNumber}`}
            secondDescription={beneficiary.relationship.value}
            checked={beneficiary.selected}
            onClick={() =>
              onSelectBeneficiary(beneficiary.identificationNumber)
            }
          />
        ))}
      </Grid>
    </Fieldset>
  );
}

export { BeneficiariesFormUI };
