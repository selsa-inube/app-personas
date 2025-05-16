import { BoxAttribute } from "@components/cards/BoxAttribute";
import { inube } from "@design/tokens";
import { renderSystemValidationsVerification } from "@forms/SystemValidationsForm/verification";
import { renderTermsAndConditionsVerification } from "@forms/TermsAndConditionsForm/verification";
import { Divider, Grid, Stack } from "@inubekit/inubekit";
import { currencyFormat } from "@utils/currency";
import { accountDebitTypeDM } from "src/model/domains/requests/pqrsTypeDM";
import { registerInEventSteps } from "../../../config/assisted";
import { IFormsRegisterInEvent } from "../../../types";
import { IChooseEntriesEntry } from "../../ChooseEntriesForm/types";
import { ILiquidationEntry } from "../../LiquidationForm/types";
import { IPaymentMethodEntry } from "../../PaymentMethodForm/types";

const renderChooseEntriesVerification = (
  values: IChooseEntriesEntry,
  isTablet: boolean,
) => (
  <Stack direction="column" gap={inube.spacing.s100} width="100%">
    {values.entriesCategories.map((entry) => (
      <Grid
        key={entry.id}
        templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
        autoRows="auto"
        gap={inube.spacing.s100}
        width="100%"
      >
        <BoxAttribute label="Grupo:" value={entry.name} />
        <BoxAttribute label="Entradas solicitadas:" value={entry.count} />
      </Grid>
    ))}
  </Stack>
);

const renderLiquidationVerification = (values: ILiquidationEntry) => (
  <Stack direction="column" gap={inube.spacing.s200} width="100%">
    {values.entriesCategories.map((entry) => (
      <Grid
        key={entry.id}
        templateColumns={`repeat(${1}, 1fr)`}
        autoRows="auto"
        gap={inube.spacing.s100}
        width="100%"
      >
        <BoxAttribute label="Entradas solicitadas:" value={entry.count} />
        <BoxAttribute
          label="Valor unitario:"
          value={currencyFormat(entry.value)}
        />
        <BoxAttribute
          label="Valor pleno:"
          value={currencyFormat(entry.fullValue || 0)}
        />
        {entry.subsidyName && entry.subsidyValue && (
          <BoxAttribute
            label={entry.subsidyName}
            value={currencyFormat(entry.subsidyValue)}
          />
        )}
      </Grid>
    ))}
    <Divider dashed />

    <BoxAttribute
      label="Total a pagar:"
      value={currencyFormat(values.totalValue)}
    />
  </Stack>
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
    <BoxAttribute label="Medio de pago:" value={values.paymentMethodName} />
    <BoxAttribute
      label="Cuenta a debitar:"
      value={accountDebitTypeDM.valueOf(values.accountToDebit || "")?.value}
    />
    <BoxAttribute
      label="Numero de cuenta:"
      value={getAccountDescription(values.accountNumber || "")}
    />
  </Grid>
);

interface VerificationBoxesProps {
  registerInEvent: IFormsRegisterInEvent;
  stepKey: keyof typeof registerInEventSteps;
  isTablet: boolean;
}

function VerificationBoxes(props: VerificationBoxesProps) {
  const { registerInEvent, stepKey, isTablet } = props;
  return (
    <>
      {stepKey === "chooseEntries" &&
        renderChooseEntriesVerification(
          registerInEvent.chooseEntries.values,
          isTablet,
        )}

      {stepKey === "liquidation" &&
        renderLiquidationVerification(registerInEvent.liquidation.values)}

      {stepKey === "paymentMethod" &&
        renderPaymentMethodVerification(
          registerInEvent.paymentMethod.values,
          isTablet,
        )}

      {stepKey === "systemValidations" &&
        renderSystemValidationsVerification(
          registerInEvent.systemValidations.values,
          isTablet,
        )}

      {stepKey === "termsAndConditions" &&
        renderTermsAndConditionsVerification(
          registerInEvent.termsAndConditions.values,
          isTablet,
        )}
    </>
  );
}

export { VerificationBoxes };
