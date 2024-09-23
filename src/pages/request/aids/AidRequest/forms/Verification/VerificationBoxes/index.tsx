import { BoxAttribute } from "@components/cards/BoxAttribute";
import { inube } from "@design/tokens";
import { renderDisbursementVerification } from "@forms/DisbursementForm/verification";
import { renderSystemValidationsVerification } from "@forms/SystemValidationsForm/verification";
import { Grid } from "@inubekit/grid";
import { currencyFormat } from "src/utils/currency";
import { truncateFileName } from "src/utils/texts";
import { aidRequestSteps } from "../../../config/assisted";
import { IFormsAidRequest } from "../../../types";
import { IBeneficiariesEntry } from "../../BeneficiariesForm/types";
import { IDetailsSituationEntry } from "../../DetailsSituationForm/types";
import { IDocumentaryRequirementsEntry } from "../../DocumentaryRequirementsForm/types";

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

const renderDetailsSituationVerification = (
  values: IDetailsSituationEntry,
  isTablet: boolean,
) => {
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
      {values.message !== "" && (
        <BoxAttribute
          label="Detalles adicionales:"
          value={values.message}
          direction="column"
        />
      )}
    </Grid>
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
  stepKey: keyof typeof aidRequestSteps;
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

      {stepKey === "detailsSituation" &&
        renderDetailsSituationVerification(
          aidRequest.detailsSituation.values,
          isTablet,
        )}

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
