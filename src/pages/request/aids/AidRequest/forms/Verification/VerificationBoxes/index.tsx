import { BoxAttribute } from "@components/cards/BoxAttribute";
import { inube } from "@design/tokens";
import { renderDisbursementVerification } from "@forms/DisbursementForm/verification";
import { renderSystemValidationsVerification } from "@forms/SystemValidationsForm/verification";
import { Grid } from "@inubekit/grid";
import { Stack } from "@inubekit/stack";
import { currencyFormat } from "src/utils/currency";
import { truncateFileName } from "src/utils/texts";
import { IFormsAidRequest } from "../../../types";
import { IAmountEntry } from "../../AmountForm/types";
import { IBeneficiariesEntry } from "../../BeneficiariesForm/types";
import { IDetailsSituationEntry } from "../../DetailsSituationForm/types";
import { IDocumentaryRequirementsEntry } from "../../DocumentaryRequirementsForm/types";
import { aidRequestBoxTitles } from "../config/box";

const renderBeneficiariesVerification = (
  values: IBeneficiariesEntry,
  isTablet: boolean,
) => {
  const selectedBeneficiary = values.beneficiaries.find(
    (beneficiary) => beneficiary.selected,
  );
  return (
    <Grid
      templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
      autoRows="auto"
      width="100%"
      gap={inube.spacing.s100}
    >
      <BoxAttribute label="Nombre:" value={selectedBeneficiary?.name} />
      <BoxAttribute
        label="Identificación:"
        value={`${selectedBeneficiary?.identificationType} ${selectedBeneficiary?.identificationNumber}`}
      />
      <BoxAttribute
        label="Tipo:"
        value={selectedBeneficiary?.relationship.value}
      />
    </Grid>
  );
};

const renderAmountVerification = (values: IAmountEntry, isTablet: boolean) => {
  return (
    <Grid
      templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
      autoRows="auto"
      width="100%"
      gap={inube.spacing.s100}
    >
      <BoxAttribute
        label="Valor de la solicitud:"
        value={currencyFormat(values.applicationValue || 0)}
      />
    </Grid>
  );
};

const renderDetailsSituationVerification = (values: IDetailsSituationEntry) => {
  return (
    <Stack width="100%" direction="column">
      {values.message !== "" && (
        <BoxAttribute
          label="Detalles adicionales:"
          value={values.message}
          direction="column"
        />
      )}
    </Stack>
  );
};

const renderDocumentaryRequirementsVerification = (
  values: IDocumentaryRequirementsEntry,
  isTablet: boolean,
) => {
  return (
    <Grid
      templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
      autoRows="auto"
      width="100%"
      gap={inube.spacing.s100}
    >
      {values.selectedDocuments.map((document) => (
        <BoxAttribute
          key={document.file.name}
          label={truncateFileName(document.file.name, 55)}
        />
      ))}
    </Grid>
  );
};

interface VerificationBoxesProps {
  aidRequest: IFormsAidRequest;
  stepKey: keyof typeof aidRequestBoxTitles;
  isTablet: boolean;
}

function VerificationBoxes(props: VerificationBoxesProps) {
  const { stepKey, aidRequest, isTablet } = props;
  return (
    <>
      {stepKey === "beneficiaries" &&
        renderBeneficiariesVerification(
          aidRequest.beneficiaries.values,
          isTablet,
        )}

      {stepKey === "amount" &&
        renderAmountVerification(aidRequest.amount.values, isTablet)}

      {stepKey === "detailsSituation" &&
        renderDetailsSituationVerification(aidRequest.detailsSituation.values)}

      {stepKey === "systemValidations" &&
        renderSystemValidationsVerification(
          aidRequest.systemValidations.values,
          isTablet,
        )}

      {stepKey === "documentaryRequirements" &&
        renderDocumentaryRequirementsVerification(
          aidRequest.documentaryRequirements.values,
          isTablet,
        )}

      {stepKey === "disbursement" &&
        renderDisbursementVerification(
          aidRequest.disbursement.values,
          isTablet,
        )}
    </>
  );
}

export { VerificationBoxes };
