import { BoxAttribute } from "@components/cards/BoxAttribute";
import { periodicityDM } from "src/model/domains/general/periodicityDM";
import { currencyFormat } from "src/utils/currency";
import { IFormsCdatRequest } from "../../../types";
import { IConditionsEntry } from "../../ConditionsForm/types";
import { IInvestmentEntry } from "../../InvestmentForm/types";

import { inube } from "@design/tokens";
import { renderCommentsVerification } from "@forms/CommentsForm/verification";
import { renderContactChannelsVerification } from "@forms/ContactChannelsForm/verification";
import { renderDisbursementVerification } from "@forms/DisbursementForm/verification";
import { renderSystemValidationsVerification } from "@forms/SystemValidationsForm/verification";
import { renderTermsAndConditionsVerification } from "@forms/TermsAndConditionsForm/verification";
import { Grid } from "@inubekit/grid";
import { Stack } from "@inubekit/stack";
import { EPaymentMethodType } from "src/model/entity/payment";
import { IInvestmentNameEntry } from "../../InvestmentNameForm/types";
import { paymentMethods } from "../../PaymentMethodForm/config/payment";
import {
  EMoneySourceType,
  IPaymentMethodEntry,
} from "../../PaymentMethodForm/types";
import { cdatRequestBoxTitles } from "../config/box";

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

const renderConditionsVerification = (values: IConditionsEntry) => (
  <Stack direction="column" gap={inube.spacing.s100} width="100%">
    <BoxAttribute
      label="Pago de intereses:"
      value={periodicityDM.valueOf(values.interestPayment)?.value}
    />
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

        <BoxAttribute
          label="Valor pagado:"
          value={currencyFormat(values.valueToPay)}
        />

        {Object.values(values.moneySources || {}).map(
          (moneySource) =>
            moneySource.value > 0 && (
              <BoxAttribute
                key={moneySource.id}
                label={
                  moneySource.type === EMoneySourceType.SAVINGACCOUNT
                    ? `${moneySource.label} - ${moneySource.id}`
                    : moneySource.label
                }
                value={currencyFormat(moneySource.value)}
              />
            ),
        )}
      </>
    )}
  </Grid>
);

const renderInvestmentNameVerification = (
  values: IInvestmentNameEntry,
  isTablet: boolean,
) => (
  <Stack
    direction="column"
    gap={isTablet ? inube.spacing.s200 : inube.spacing.s250}
    width="100%"
  >
    <BoxAttribute label="Nombre del producto:" value={values.productName} />
  </Stack>
);

interface VerificationBoxesProps {
  cdatRequest: IFormsCdatRequest;
  stepKey: keyof typeof cdatRequestBoxTitles;
  isTablet: boolean;
}

function VerificationBoxes(props: VerificationBoxesProps) {
  const { cdatRequest, stepKey, isTablet } = props;
  return (
    <>
      {stepKey === "investment" &&
        renderInvestmentVerification(cdatRequest.investment.values, isTablet)}
      {stepKey === "conditions" &&
        renderConditionsVerification(cdatRequest.conditions.values)}
      {stepKey === "paymentMethod" &&
        renderPaymentMethodVerification(
          cdatRequest.paymentMethod.values,
          isTablet,
        )}
      {stepKey === "disbursement" &&
        renderDisbursementVerification(cdatRequest.disbursement.values)}
      {stepKey === "systemValidations" &&
        renderSystemValidationsVerification(
          cdatRequest.systemValidations.values,
          isTablet,
        )}
      {stepKey === "investmentName" &&
        renderInvestmentNameVerification(
          cdatRequest.investmentName.values,
          isTablet,
        )}
      {stepKey === "comments" &&
        renderCommentsVerification(cdatRequest.comments.values)}
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
