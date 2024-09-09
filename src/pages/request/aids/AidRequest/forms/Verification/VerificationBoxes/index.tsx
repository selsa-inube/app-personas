import { BoxAttribute } from "@components/cards/BoxAttribute";
import { inube } from "@design/tokens";
import { IDisbursementEntry } from "@forms/DisbursementForm/types";
import { Grid } from "@inubekit/grid";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/stack";
import { getValueOfDomain } from "@mocks/domains/domainService.mocks";
import { MdOutlineCheckCircle, MdOutlineHighlightOff } from "react-icons/md";
import { accountTypeDM } from "src/model/domains/general/accountTypeDM";
import { bankDM } from "src/model/domains/general/bankDM";
import { disbursementTypeDM } from "src/model/domains/general/disbursementTypeDM";
import { genderDM } from "src/model/domains/general/updateData/personalInformation/genderdm";
import { identificationTypeDM } from "src/model/domains/general/updateData/personalInformation/identificationTypeDM";
import { currencyFormat } from "src/utils/currency";
import { truncateFileName } from "src/utils/texts";
import { IFormsAidRequest } from "../../../types";
import { IAmountEntry } from "../../AmountForm/types";
import { IBeneficiariesEntry } from "../../BeneficiariesForm/types";
import { IDetailsSituationEntry } from "../../DetailsSituationForm/types";
import { IDocumentaryRequirementsEntry } from "../../DocumentaryRequirementsForm/types";
import { IRegulationValidationsEntry } from "../../RegulationValidationsForm/types";
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
          key={document.file.name}
          label={truncateFileName(document.file.name, 55)}
        />
      ))}
    </Grid>
  );
};

const getAccountDescription = (accountId: string) => {
  return `Ahorros ${accountId}`;
};

const renderDisbursementVerification = (values: IDisbursementEntry) => (
  <Stack direction="column" gap={inube.spacing.s100} width="100%">
    <BoxAttribute
      label="Forma de desembolso:"
      value={disbursementTypeDM.valueOf(values.disbursement || "")?.value}
    />
    {values.accountType && (
      <BoxAttribute
        label="Tipo de cuenta:"
        value={accountTypeDM.valueOf(values.accountType)?.value}
      />
    )}
    {values.accountNumber && (
      <BoxAttribute
        label="Numero de cuenta:"
        value={getAccountDescription(values.accountNumber)}
      />
    )}
    {values.writeAccountNumber && (
      <BoxAttribute
        label="Numero de cuenta:"
        value={values.writeAccountNumber}
      />
    )}
    {values.observations && (
      <BoxAttribute
        label="Observaciones:"
        value={values.observations}
        direction="column"
      />
    )}
    {values.supplier && (
      <BoxAttribute
        label="Proveedor:"
        value={getValueOfDomain(values.supplier, "suppliersType")?.value}
      />
    )}
    {values.identificationType && (
      <BoxAttribute
        label="Tipo de identificación:"
        value={identificationTypeDM.valueOf(values.identificationType)?.value}
      />
    )}
    {values.identification && (
      <BoxAttribute label="Identificación:" value={values.identification} />
    )}
    {values.socialReason && (
      <BoxAttribute label="Razón social:" value={values.socialReason} />
    )}
    {values.firstName && (
      <BoxAttribute label="Primer nombre:" value={values.firstName} />
    )}
    {values.secondName && (
      <BoxAttribute label="Segundo nombre:" value={values.secondName} />
    )}
    {values.firstLastName && (
      <BoxAttribute label="Primer apellido:" value={values.firstLastName} />
    )}
    {values.secondLastName && (
      <BoxAttribute label="Segundo apellido:" value={values.secondLastName} />
    )}
    {values.gender && (
      <BoxAttribute
        label="Género:"
        value={genderDM.valueOf(values.gender)?.value}
      />
    )}
    {values.others && <BoxAttribute label="Otros:" value={values.others} />}
    {values.entity && (
      <BoxAttribute
        label="Entidad:"
        value={bankDM.valueOf(values.entity)?.value}
      />
    )}
  </Stack>
);

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
