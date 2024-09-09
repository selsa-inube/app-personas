import { BoxAttribute } from "@components/cards/BoxAttribute";
import { inube } from "@design/tokens";
import { IDisbursementEntry } from "@forms/DisbursementForm/types";
import { Stack } from "@inubekit/stack";
import { getValueOfDomain } from "@mocks/domains/domainService.mocks";
import { accountTypeDM } from "src/model/domains/general/accountTypeDM";
import { activeDM } from "src/model/domains/general/activedm";
import { bankDM } from "src/model/domains/general/bankDM";
import { disbursementTypeDM } from "src/model/domains/general/disbursementTypeDM";
import { periodicityDM } from "src/model/domains/general/periodicityDM";
import { genderDM } from "src/model/domains/general/updateData/personalInformation/genderdm";
import { identificationTypeDM } from "src/model/domains/general/updateData/personalInformation/identificationTypeDM";
import { IContactChannelsEntry } from "src/shared/forms/ContactChannelsForm/types";
import { currencyFormat } from "src/utils/currency";
import { ICommentsEntry } from "../../../../../../../shared/forms/CommentsForm/types";
import { IFormsProgrammedSavingFixedRequest } from "../../../types";
import { IGoalEntry } from "../../GoalForm/types";
import { IPlanNameEntry } from "../../PlanNameForm/types";
import { IQuotaEntry } from "../../QuotaForm/types";
import { programmedSavingFixedRequestBoxTitles } from "../config/box";

const renderQuotaVerification = (values: IQuotaEntry) => (
  <Stack direction="column" gap={inube.spacing.s100} width="100%">
    <BoxAttribute
      label="Valor periódico del ahorro:"
      value={currencyFormat(Number(values.periodicValue))}
    />
    <BoxAttribute
      label="Medio de pago:"
      value={getValueOfDomain(values.paymentMethod, "paymentMethod")?.value}
    />
    <BoxAttribute
      label="Periodicidad:"
      value={periodicityDM.valueOf(values.periodicity)?.value}
    />
    {values.paymentMethod === "automaticDebit" && values.accountToDebit && (
      <>
        <BoxAttribute
          label="Cuenta a debitar:"
          value={
            getValueOfDomain(values.accountToDebit, "accountDebitType")?.value
          }
        />
        <BoxAttribute
          label="Numero de cuenta:"
          value={
            values.accountToDebit === "internalOwnAccountDebit"
              ? values.accountDescription
              : values.accountNumber
          }
        />

        {values.accountToDebit === "externalOwnAccountDebit" &&
          values.accountType &&
          values.bankEntity && (
            <>
              <BoxAttribute
                label="Tipo de cuenta:"
                value={
                  getValueOfDomain(values.accountType, "accountType")?.value
                }
              />
              <BoxAttribute
                label="Entidad bancaria:"
                value={getValueOfDomain(values.bankEntity, "bank")?.value}
              />
            </>
          )}
      </>
    )}
  </Stack>
);

const renderGoalVerification = (values: IGoalEntry) => (
  <Stack direction="column" gap={inube.spacing.s100} width="100%">
    {values.daysNumber !== "" && (
      <BoxAttribute
        label="Reembolso en número de días:"
        value={values.daysNumber}
      />
    )}

    {values.refundDate !== "" && (
      <BoxAttribute label="Reembolso en fecha:" value={values.refundDate} />
    )}
  </Stack>
);

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

const renderPlanNameVerification = (
  values: IPlanNameEntry,
  isTablet: boolean,
) => (
  <Stack
    direction="column"
    gap={isTablet ? inube.spacing.s200 : inube.spacing.s250}
    width="100%"
  >
    <BoxAttribute label="Nombre:" value={values.productName} />
  </Stack>
);

const renderContactChannelsVerification = (values: IContactChannelsEntry) => (
  <Stack width="100%" direction="column" gap={inube.spacing.s100}>
    <BoxAttribute label="Teléfono:" value={values.landlinePhone} />
    <BoxAttribute label="Celular:" value={values.cellPhone} />
    <BoxAttribute label="Correo:" value={values.email} />
    <BoxAttribute
      label="Autoriza recibir información:"
      value={values.acceptNotifications ? activeDM.Y.value : activeDM.N.value}
    />
  </Stack>
);

const renderCommentsVerification = (values: ICommentsEntry) => (
  <Stack width="100%" direction="column">
    {values.comments !== "" && (
      <BoxAttribute
        label="Comentarios adicionales:"
        value={values.comments}
        direction="column"
      />
    )}
  </Stack>
);

interface SummaryBoxesProps {
  programmedSavingFixedRequest: IFormsProgrammedSavingFixedRequest;
  stepKey: keyof typeof programmedSavingFixedRequestBoxTitles;
  isTablet: boolean;
}

function SummaryBoxes(props: SummaryBoxesProps) {
  const { programmedSavingFixedRequest, stepKey, isTablet } = props;
  return (
    <>
      {stepKey === "quota" &&
        renderQuotaVerification(programmedSavingFixedRequest.quota.values)}

      {stepKey === "goal" &&
        renderGoalVerification(programmedSavingFixedRequest.goal.values)}

      {stepKey === "disbursement" &&
        renderDisbursementVerification(
          programmedSavingFixedRequest.disbursement.values,
        )}

      {stepKey === "planName" &&
        renderPlanNameVerification(
          programmedSavingFixedRequest.planName.values,
          isTablet,
        )}

      {stepKey === "contactChannels" &&
        renderContactChannelsVerification(
          programmedSavingFixedRequest.contactChannels.values,
        )}

      {stepKey === "comments" &&
        renderCommentsVerification(
          programmedSavingFixedRequest.comments.values,
        )}
    </>
  );
}

export { SummaryBoxes };
