import { BoxAttribute } from "@components/cards/BoxAttribute";
import { activeDM } from "src/model/domains/general/activedm";
import { periodicityDM } from "src/model/domains/general/periodicityDM";
import { currencyFormat } from "src/utils/currency";
import { IFormsCdatRequest } from "../../../types";
import { IConditionsEntry } from "../../ConditionsForm/types";
import { IInvestmentEntry } from "../../InvestmentForm/types";

import { inube } from "@design/tokens";
import { IDisbursementEntry } from "@forms/DisbursementForm/types";
import { Grid } from "@inubekit/grid";
import { Stack } from "@inubekit/stack";
import { Tag } from "@inubekit/tag";
import { getValueOfDomain } from "@mocks/domains/domainService.mocks";
import { accountTypeDM } from "src/model/domains/general/accountTypeDM";
import { bankDM } from "src/model/domains/general/bankDM";
import { disbursementTypeDM } from "src/model/domains/general/disbursementTypeDM";
import { genderDM } from "src/model/domains/general/updateData/personalInformation/genderdm";
import { identificationTypeDM } from "src/model/domains/general/updateData/personalInformation/identificationTypeDM";
import { EPaymentMethodType } from "src/model/entity/payment";
import { ICommentsEntry } from "src/shared/forms/CommentsForm/types";
import { IContactChannelsEntry } from "src/shared/forms/ContactChannelsForm/types";
import { IInvestmentNameEntry } from "../../InvestmentNameForm/types";
import { paymentMethods } from "../../PaymentMethodForm/config/payment";
import {
  EMoneySourceType,
  IPaymentMethodEntry,
} from "../../PaymentMethodForm/types";
import { ISystemValidationsEntry } from "../../SystemValidationsForm/types";
import { ITermsAndConditionsEntry } from "../../TermsAndConditionsForm/types";
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
