import { inube } from "@design/tokens";
import {
  Grid,
  Message,
  Moneyfield,
  Numberfield,
  Stack,
  Text,
} from "@inubekit/inubekit";
import { FormikProps } from "formik";
import {
  parseCurrencyString,
  currencyFormat,
} from "src/utils/currency";
import { ISimulateCreditEntry } from "../../types";

interface IExtraordinaryQuotasStepProps {
  formik: FormikProps<ISimulateCreditEntry>;
  loading?: boolean;
  showMessage?: boolean;
}

function ExtraordinaryQuotasStep(props: IExtraordinaryQuotasStepProps) {
  const { formik, loading, showMessage = true } = props;

  const { extraordinaryQuotas } = formik.values;

  const handleChangeWithCurrency = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsedValue = parseCurrencyString(e.target.value);
    formik.setFieldValue(
      `extraordinaryQuotas.${e.target.name}`,
      isNaN(parsedValue) ? "" : parsedValue,
    );
  };

  const customHandleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    formik.setFieldValue(
      `extraordinaryQuotas.${event.target.name}`,
      event.target.value,
    );
  };

  return (
    <Stack direction="column" gap={inube.spacing.s250}>
      <Text type="title" size="medium" appearance="gray" weight="bold">
        Cuotas extraordinarias
      </Text>

      {showMessage && (
        <Message
          title={
            extraordinaryQuotas.isAvailable
              ? `Si deseas, puedes definir un máximo de ${extraordinaryQuotas.maxQuantity} cuotas extraordinarias, con un valor de hasta ${currencyFormat(extraordinaryQuotas.maxValuePerQuota)} cada una.`
              : "Con estos valores no es posible registrar cuotas extraordinarias. Puedes continuar con la simulación."
          }
          appearance="help"
          size="large"
        />
      )}

      {extraordinaryQuotas.isAvailable && (
        <Grid
          templateColumns={`repeat(2, 1fr)`}
          autoRows="auto"
          gap={inube.spacing.s200}
          width="100%"
        >
          <Numberfield
            label="Cantidad de cuotas extraordinarias"
            placeholder="Digita la cantidad"
            name="quantity"
            id="quantity"
            value={extraordinaryQuotas.quantity || ""}
            message={
              extraordinaryQuotas.quantity > extraordinaryQuotas.maxQuantity
                ? "Has superado la cantidad máxima de cuotas extraordinarias."
                : ""
            }
            disabled={loading}
            size="compact"
            fullwidth
            status={
              extraordinaryQuotas.quantity > extraordinaryQuotas.maxQuantity
                ? "invalid"
                : "pending"
            }
            onBlur={formik.handleBlur}
            onChange={customHandleChange}
          />
          <Moneyfield
            label="Valor por cuota extraordinaria"
            placeholder="Digita el valor"
            name="valuePerQuota"
            id="valuePerQuota"
            value={
              extraordinaryQuotas.valuePerQuota
                ? currencyFormat(extraordinaryQuotas.valuePerQuota)
                : ""
            }
            message={
              extraordinaryQuotas.valuePerQuota >
                extraordinaryQuotas.maxValuePerQuota
                ? "Has superado el valor máximo por cuota extraordinaria."
                : ""
            }
            disabled={loading}
            size="compact"
            fullwidth
            status={
              extraordinaryQuotas.valuePerQuota >
                extraordinaryQuotas.maxValuePerQuota
                ? "invalid"
                : "pending"
            }
            onBlur={formik.handleBlur}
            onChange={handleChangeWithCurrency}
          />
        </Grid>
      )}
    </Stack>
  );
}

export { ExtraordinaryQuotasStep };
export type { IExtraordinaryQuotasStepProps };
