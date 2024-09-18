import { BoxAttribute } from "@components/cards/BoxAttribute";
import { inube } from "@design/tokens";
import { Grid } from "@inubekit/grid";
import { getValueOfDomain } from "@mocks/domains/domainService.mocks";
import { accountTypeDM } from "src/model/domains/general/accountTypeDM";
import { bankDM } from "src/model/domains/general/bankDM";
import { IPaymentMethodEntry } from "./types";

const renderPaymentMethodVerification = (
  values: IPaymentMethodEntry,
  isTablet: boolean,
) => {
  return (
    <Grid
      templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
      autoRows="auto"
      gap={inube.spacing.s100}
      width="100%"
    >
      <BoxAttribute
        label="Medio de pago:"
        value={
          values.paymentMethods.find(
            (method) => method.id === values.paymentMethodType,
          )?.value
        }
      />
      {values.accountToDebit && (
        <BoxAttribute
          label="Cuenta a debitar:"
          value={
            getValueOfDomain(values.accountToDebit, "accountDebitType")?.value
          }
        />
      )}
      {values.accountSelection && (
        <BoxAttribute
          label="Selección de cuenta:"
          value={
            getValueOfDomain(values.accountSelection, "accountSelectionType")
              ?.value
          }
        />
      )}
      {values.accountNumberSelect && !values.accountSelection && (
        <BoxAttribute
          label="Número de cuenta:"
          value={values.accountNumberSelect}
        />
      )}
      {values.accountNumberTextField && values.accountSelection && (
        <BoxAttribute
          label="Número de cuenta:"
          value={values.accountNumberTextField}
        />
      )}
      {values.accountType && (
        <BoxAttribute
          label="Tipo de cuenta:"
          value={accountTypeDM.valueOf(values.accountType)?.value}
        />
      )}
      {values.bankEntity && (
        <BoxAttribute
          label="Entidad:"
          value={bankDM.valueOf(values.bankEntity)?.value}
        />
      )}
    </Grid>
  );
};

export { renderPaymentMethodVerification };
