import { BoxAttribute } from "@components/cards/BoxAttribute";
import { Stack } from "@design/layout/Stack";
import { IContactChannelsEntry } from "@forms/ContactChannelsForm/types";
import { activeDM } from "src/model/domains/general/activedm";
import { IFormsProgrammedSavingFixedRequest } from "../../../types";
import { currencyFormat } from "src/utils/currency";
import { IGoalEntry } from "../../GoalForm/types";
import { IQuotaEntry } from "../../QuotaForm/types";
import { getValueOfDomain } from "@mocks/domains/domainService.mocks";
import { peridiocityDM } from "src/model/domains/general/peridiocity";
import { IReimbursementEntry } from "../../ReimbursementForm/types";

const renderQuotaSummary = (
  values: IQuotaEntry,
  isTablet: boolean
) => (
  <Stack direction="column" gap={isTablet ? "s200" : "s250"} width="100%">
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
      value={peridiocityDM.valueOf(values.periodicity)?.value}
    />
  </Stack>
);

const renderGoalSummary = (values: IGoalEntry, isTablet: boolean) => (
  <Stack direction="column" gap={isTablet ? "s200" : "s250"} width="100%">
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

const renderReimbursementSummary = (values: IReimbursementEntry) => (
  <Stack width="100%" direction="column" gap="s100">
    <BoxAttribute label="Forma de reembolso:" value={getValueOfDomain(values.reimbursementType, "reimbursementType")?.value} />
    <BoxAttribute label="Cuenta:" value={values.accountReimbursement} />
  </Stack>
);

const renderContactChannelsVerification = (values: IContactChannelsEntry) => (
  <Stack width="100%" direction="column" gap="s100">
    <BoxAttribute label="Teléfono:" value={values.landlinePhone} />
    <BoxAttribute label="Celular:" value={values.cellPhone} />
    <BoxAttribute label="Correo:" value={values.email} />
    <BoxAttribute
      label="Acepta política de tratamiento de datos:"
      value={values.acceptDataPolicy ? activeDM.Y.value : activeDM.N.value}
    />
    <BoxAttribute
      label="Autoriza recibir información:"
      value={values.acceptNotifications ? activeDM.Y.value : activeDM.N.value}
    />
  </Stack>
);

interface SummaryBoxesProps {
  programmedSavingFixedRequest: IFormsProgrammedSavingFixedRequest;
  stepKey: string;
  isTablet: boolean;
}

function SummaryBoxes(props: SummaryBoxesProps) {
  const { programmedSavingFixedRequest, stepKey, isTablet } = props;
  return (
    <>
    {stepKey === "quota" &&
        renderQuotaSummary(programmedSavingFixedRequest.quota.values, isTablet)}
        
      {stepKey === "goal" &&
        renderGoalSummary(programmedSavingFixedRequest.goal.values, isTablet)}

        {stepKey === "reimbursement" &&
        renderReimbursementSummary(programmedSavingFixedRequest.reimbursement.values)}

      {stepKey === "contactChannels" &&
        renderContactChannelsVerification(
          programmedSavingFixedRequest.contactChannels.values
        )}
    </>
  );
}

export { SummaryBoxes };
