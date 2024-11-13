import { BoxAttribute } from "@components/cards/BoxAttribute";
import { currencyFormat } from "src/utils/currency";
import { IFormsCdatRequest } from "../../../types";
import { IDeadlineEntry } from "../../DeadlineForm/types";
import { IInvestmentEntry } from "../../InvestmentForm/types";

import { inube } from "@design/tokens";
import { renderContactChannelsVerification } from "@forms/ContactChannelsForm/verification";
import { renderDisbursementVerification } from "@forms/DisbursementForm/verification";
import { renderShareMaturityVerification } from "@forms/ShareMaturityForm/verification";
import { renderSystemValidationsVerification } from "@forms/SystemValidationsForm/verification";
import { renderTermsAndConditionsVerification } from "@forms/TermsAndConditionsForm/verification";
import { Grid } from "@inubekit/grid";
import { Stack } from "@inubekit/stack";
import { EPaymentMethodType } from "src/model/entity/payment";
import { cdatRequestSteps } from "../../../config/assisted";
import { renderInterestPaymentVerification } from "../../InterestPaymentForm/verification";
import { paymentMethods } from "../../PaymentMethodForm/config/payment";
import { IPaymentMethodEntry } from "../../PaymentMethodForm/types";

const renderInvestmentVerification = (
  values: IInvestmentEntry,
  isTablet: boolean,
) => (
  <Stack
    direction="column"
    gap={isTablet ? inube.spacing.s200 : inube.spacing.s250}
    width="100%"
  >
    <BoxAttribute
      label="Valor de la inversión:"
      value={currencyFormat(Number(values.valueInvestment))}
    />
  </Stack>
);

const renderDeadlineVerification = (values: IDeadlineEntry) => (
  <Stack direction="column" gap={inube.spacing.s100} width="100%">
    <BoxAttribute label="Número de días:" value={values.deadlineDays} />
  </Stack>
);

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
    {values.paymentMethod === EPaymentMethodType.PSE ? (
      <BoxAttribute
        label="Forma de recaudo:"
        value={
          paymentMethods.find(
            (paymentMethod) => paymentMethod.id === values.paymentMethod,
          )?.value
        }
      />
    ) : (
      <>
        <BoxAttribute
          label="Forma de recaudo:"
          value={
            paymentMethods.find(
              (paymentMethod) => paymentMethod.id === values.paymentMethod,
            )?.value
          }
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
        renderDeadlineVerification(cdatRequest.deadline.values)}
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
      {stepKey === "shareMaturity" &&
        renderShareMaturityVerification(
          cdatRequest.shareMaturity.values,
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
        renderContactChannelsVerification(cdatRequest.contactChannels.values)}
    </>
  );
}

export { VerificationBoxes };
