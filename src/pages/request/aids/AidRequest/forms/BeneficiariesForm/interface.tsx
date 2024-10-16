import { RadioCard } from "@design/input/RadioCard";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Fieldset } from "@inubekit/fieldset";
import { Grid } from "@inubekit/grid";
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
    <Fieldset legend="Posibles beneficiarios" type="title" size="medium">
      <Grid
        templateColumns={`repeat(${isMobile ? 1 : isTablet ? 2 : 3}, 1fr)`}
        autoRows="auto"
        gap={inube.spacing.s200}
        width="100%"
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
            secondDescription={beneficiary.relationship?.value}
            checked={beneficiary.selected || false}
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
