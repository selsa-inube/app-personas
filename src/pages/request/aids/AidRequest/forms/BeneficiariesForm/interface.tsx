import { StyledInputRadio } from "@components/cards/DestinationCard/styles";
import { RadioCard } from "@design/input/RadioCard";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Fieldset } from "@inubekit/fieldset";
import { Grid, Stack } from "@inubekit/inubekit";
import { SkeletonLine } from "@inubekit/skeleton";
import { FormikProps } from "formik";
import { StyledLoadingBeneficiary } from "./styles";
import { IBeneficiariesEntry } from "./types";

interface BeneficiariesFormUIProps {
  formik: FormikProps<IBeneficiariesEntry>;
  loading?: boolean;
  onSelectBeneficiary: (id: string) => void;
}

function BeneficiariesFormUI(props: BeneficiariesFormUIProps) {
  const { formik, loading, onSelectBeneficiary } = props;

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

        {loading &&
          Array.from({ length: 3 }).map((_, index) => (
            <StyledLoadingBeneficiary key={index}>
              <StyledInputRadio
                id={`skeleton-${index}`}
                name={`skeleton-${index}`}
                type="radio"
                readOnly
                disabled
              />

              <Stack direction="column" gap={inube.spacing.s050} width="100%">
                <SkeletonLine width="100%" animated />
                <SkeletonLine width="25%" animated />
                <SkeletonLine width="25%" animated />
              </Stack>
            </StyledLoadingBeneficiary>
          ))}
      </Grid>
    </Fieldset>
  );
}

export { BeneficiariesFormUI };
