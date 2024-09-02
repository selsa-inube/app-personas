import { BoxAttribute } from "@components/cards/BoxAttribute";
import { activeDM } from "src/model/domains/general/activedm";
import { periodicityDM } from "src/model/domains/general/periodicityDM";
import { currencyFormat } from "src/utils/currency";
import { IFormsCdatRequest } from "../../../types";
import { IConditionsEntry } from "../../ConditionsForm/types";
import { IInvestmentEntry } from "../../InvestmentForm/types";

import { inube } from "@design/tokens";
import { Grid } from "@inubekit/grid";
import { Stack } from "@inubekit/stack";
import { Tag } from "@inubekit/tag";
import { getValueOfDomain } from "@mocks/domains/domainService.mocks";
import { EPaymentMethodType } from "src/model/entity/payment";
import { ICommentsEntry } from "src/shared/forms/CommentsForm/types";
import { IContactChannelsEntry } from "src/shared/forms/ContactChannelsForm/types";
import { IInvestmentNameEntry } from "../../InvestmentNameForm/types";
import { paymentMethods } from "../../PaymentMethodForm/config/payment";
import {
  EMoneySourceType,
  IPaymentMethodEntry,
} from "../../PaymentMethodForm/types";
import { IRefundEntry } from "../../RefundForm/types";
import { ISystemValidationsEntry } from "../../SystemValidationsForm/types";
import { cdatRequestBoxTitles } from "../config/box";
import { ITermsAndConditionsEntry } from "../../TermsAndConditionsForm/types";

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

const renderRefundVerification = (values: IRefundEntry) => {
  return (
    <Stack direction="column" gap={inube.spacing.s100} width="100%">
      <BoxAttribute
        label="Forma de reembolso:"
        value={getValueOfDomain(values.refundMethod, "refundMethod")?.value}
      />
      <BoxAttribute label="Cuenta:" value={values.accountDescription} />
    </Stack>
  );
};

const renderSystemValidationsVerification = (
  values: ISystemValidationsEntry,
  isTablet: boolean,
) => {
  return (
    <Grid
      templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
      autoRows="auto"
      gap={inube.spacing.s100}
      width="100%"
    >
      {values.validations.map((validation) => (
        <BoxAttribute
          key={validation.id}
          value={validation.label}
          iconAfter={
            validation.value === "success" ? (
              <Tag label="Cumple" appearance="success" />
            ) : validation.value === "fail" ? (
              <Tag label="No cumple" appearance="danger" />
            ) : (
              <Tag label="Por evaluar" appearance="warning" />
            )
          }
        />
      ))}
    </Grid>
  );
};

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

const renderTermsAndConditionsVerification = (
  values: ITermsAndConditionsEntry,
  isTablet: boolean,
) => (
  <Grid
    templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
    autoRows="auto"
    gap={inube.spacing.s100}
    width="100%"
  >
    <BoxAttribute
      label="Acepta términos y condiciones:"
      value={values.accept ? activeDM.Y.value : activeDM.N.value}
    />
    <BoxAttribute
      label="Acepta política de tratamiento de datos:"
      value={values.acceptDataPolicy ? activeDM.Y.value : activeDM.N.value}
    />
  </Grid>
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
      {stepKey === "refund" && renderRefundVerification(cdatRequest.refund.values)}
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
      {stepKey === "contactChannels" &&
        renderContactChannelsVerification(cdatRequest.contactChannels.values)}
      {stepKey === "comments" &&
        renderCommentsVerification(cdatRequest.comments.values)}
      {stepKey === "termsAndConditions" &&
        renderTermsAndConditionsVerification(
          cdatRequest.termsAndConditions.values,
          isTablet,
        )}
    </>
  );
}

export { VerificationBoxes };
