import { BoxAttribute } from "@components/cards/BoxAttribute";
import { Stack } from "@design/layout/Stack";
import { MdOutlineCheckCircle, MdOutlineHighlightOff } from "react-icons/md";
import { reimbursementTypeDM } from "src/model/domains/general/updateData/economicActivity/reimbursementTypeDM";
import { currencyFormat } from "src/utils/currency";
import { truncateFileName } from "src/utils/texts";
import { IFormsAidRequest } from "../../../types";
import { IAmountEntry } from "../../AmountForm/types";
import { IBeneficiariesEntry } from "../../BeneficiariesForm/types";
import { IDetailsSituationEntry } from "../../DetailsSituationForm/types";
import { IDisbursementEntry } from "../../DisbursementForm/types";
import { IDocumentaryRequirementsEntry } from "../../DocumentaryRequirementsForm/types";
import { IRegulationValidationsEntry } from "../../RegulationValidationsForm/types";
import { aidRequestBoxTitles } from "../config/box";
import { Icon } from "@inubekit/icon";
import { Grid } from "@inubekit/grid";
import { inube } from "@design/tokens";

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
        value={currencyFormat(values.applicationValue)}
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

const renderRegulationValidationsVerification = (
  values: IRegulationValidationsEntry,
  isTablet: boolean,
) => {
  return (
    <Grid
      templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
      autoRows="auto"
      width="100%"
      gap={inube.spacing.s100}
    >
      {values.validations.map((validation) => (
        <BoxAttribute
          key={validation.id}
          value={validation.label}
          iconAfter={
            validation.value === "success" ? (
              <Icon
                appearance="success"
                icon={<MdOutlineCheckCircle />}
                size="20px"
                spacing="narrow"
              />
            ) : (
              <Icon
                appearance="danger"
                icon={<MdOutlineHighlightOff />}
                size="20px"
                spacing="narrow"
              />
            )
          }
        />
      ))}
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
          key={document.name}
          label={truncateFileName(document.name, 55)}
        />
      ))}
    </Grid>
  );
};

const renderDisbursementVerification = (values: IDisbursementEntry) => {
  return (
    <Stack width="100%" gap="s100" direction="column">
      <BoxAttribute
        label="Desembolso:"
        value={reimbursementTypeDM.valueOf(values.disbursementMethod)?.value}
      />
      <BoxAttribute label="Cuenta:" value={values.accountDescription} />
    </Stack>
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

      {stepKey === "regulationValidations" &&
        renderRegulationValidationsVerification(
          aidRequest.regulationValidations.values,
          isTablet,
        )}

      {stepKey === "documentaryRequirements" &&
        renderDocumentaryRequirementsVerification(
          aidRequest.documentaryRequirements.values,
          isTablet,
        )}

      {stepKey === "disbursement" &&
        renderDisbursementVerification(aidRequest.disbursement.values)}
    </>
  );
}

export { VerificationBoxes };
