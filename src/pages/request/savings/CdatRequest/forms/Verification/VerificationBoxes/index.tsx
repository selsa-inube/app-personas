import { BoxAttribute } from "@components/cards/BoxAttribute";
import { currencyFormat } from "src/utils/currency";
import { IFormsCdatRequest } from "../../../types";
import { IDeadlineEntry } from "../../DeadlineForm/types";
import { IInvestmentEntry } from "../../InvestmentForm/types";

import { inube } from "@design/tokens";
import { renderActionExpirationVerification } from "@forms/ActionExpirationForm/verification";
import { renderContactChannelsVerification } from "@forms/ContactChannelsForm/verification";
import { renderDisbursementVerification } from "@forms/DisbursementForm/verification";
import { renderSystemValidationsVerification } from "@forms/SystemValidationsForm/verification";
import { renderTermsAndConditionsVerification } from "@forms/TermsAndConditionsForm/verification";
import { Grid } from "@inubekit/grid";
import { accountDebitTypeDM } from "src/model/domains/requests/pqrsTypeDM";
import { formatPrimaryDate } from "src/utils/dates";
import { cdatRequestSteps } from "../../../config/assisted";
import { renderInterestPaymentVerification } from "../../InterestPaymentForm/verification";
import { IPaymentMethodEntry } from "../../PaymentMethodForm/types";

const renderInvestmentVerification = (
  values: IInvestmentEntry,
  isTablet: boolean,
) => (
  <Grid
    templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
    gap={inube.spacing.s100}
    autoRows="auto"
    width="100%"
  >
    <BoxAttribute
      label="Valor de la inversión:"
      value={currencyFormat(Number(values.investmentValue))}
    />
  </Grid>
);

const renderDeadlineVerification = (
  values: IDeadlineEntry,
  isTablet: boolean,
) => (
  <Grid
    templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
    gap={inube.spacing.s100}
    autoRows="auto"
    width="100%"
  >
    <BoxAttribute
      label="Fecha:"
      value={values.expirationDate && formatPrimaryDate(values.expirationDate)}
    />
    <BoxAttribute
      label="Plazo en número de días:"
      value={values.deadlineDays}
    />
  </Grid>
);

const getAccountDescription = (accountId: string) => {
  return `Cuenta de ahorros ${accountId}`;
};

const renderPaymentMethodVerification = (
  values: IPaymentMethodEntry,
  isTablet: boolean,
) => (
  <Grid
    templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
    gap={inube.spacing.s100}
    autoRows="auto"
    width="100%"
  >
    {values.paymentMethod === "PAGOPSE" ? (
      <BoxAttribute label="Medio de pago:" value={values.paymentMethodName} />
    ) : (
      <>
        <BoxAttribute label="Medio de pago:" value={values.paymentMethodName} />
        <BoxAttribute
          label="Cuenta a debitar:"
          value={accountDebitTypeDM.valueOf(values.accountToDebit || "")?.value}
        />
        <BoxAttribute
          label="Numero de cuenta:"
          value={getAccountDescription(values.accountNumber || "")}
        />
        <BoxAttribute
          label="Saldo disponible:"
          value={`$ ${values.availableBalance}`}
        />
      </>
    )}
  </Grid>
);

interface VerificationBoxesProps {
  cdatRequest: IFormsCdatRequest;
  stepKey: keyof typeof cdatRequestSteps;
  isTablet: boolean;
}

function VerificationBoxes(props: VerificationBoxesProps) {
  const { cdatRequest, stepKey, isTablet } = props;
  return (
    <>
      {stepKey === "investment" &&
        renderInvestmentVerification(cdatRequest.investment.values, isTablet)}
      {stepKey === "deadline" &&
        renderDeadlineVerification(cdatRequest.deadline.values, isTablet)}
      {stepKey === "interestPayment" &&
        renderInterestPaymentVerification(
          cdatRequest.interestPayment.values,
          isTablet,
        )}
      {stepKey === "paymentMethod" &&
        renderPaymentMethodVerification(
          cdatRequest.paymentMethod.values,
          isTablet,
        )}
      {stepKey === "disbursement" &&
        renderDisbursementVerification(
          cdatRequest.disbursement.values,
          isTablet,
        )}
      {stepKey === "actionExpiration" &&
        renderActionExpirationVerification(
          cdatRequest.actionExpiration.values,
          isTablet,
        )}
      {stepKey === "systemValidations" &&
        renderSystemValidationsVerification(
          cdatRequest.systemValidations.values,
          isTablet,
        )}
      {stepKey === "termsAndConditions" &&
        renderTermsAndConditionsVerification(
          cdatRequest.termsAndConditions.values,
          isTablet,
        )}
      {stepKey === "contactChannels" &&
        renderContactChannelsVerification(
          cdatRequest.contactChannels.values,
          isTablet,
        )}
    </>
  );
}

export { VerificationBoxes };
