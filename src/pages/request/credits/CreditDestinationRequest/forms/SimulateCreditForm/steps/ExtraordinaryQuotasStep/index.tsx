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
import { currencyFormat, parseCurrencyString } from "src/utils/currency";
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
      isNaN(parsedValue) ? 0 : parsedValue,
    );
  };

  const calculateTotalExtraPayment = () => {
    return (
      (formik.values.amount || 0) *
      (extraordinaryQuotas.percentageExtraPayment / 100)
    );
  };

  const calculateMaxValuePerQuota = (quotas: number) => {
    const totalExtraPayment = calculateTotalExtraPayment();

    formik.setFieldValue(
      "extraordinaryQuotas.maxValuePerQuota",
      quotas > 0 ? totalExtraPayment / quotas : totalExtraPayment,
    );
  };

  const customHandleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    formik.setFieldValue(
      `extraordinaryQuotas.${event.target.name}`,
      Number(event.target.value),
    );

    formik.setFieldValue(`extraordinaryQuotas.valuePerQuota`, 0);

    calculateMaxValuePerQuota(Number(event.target.value));
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
              ? `Puedes usar hasta ${extraordinaryQuotas.maxQuotas} cuotas extraordinarias para abonar en total ${currencyFormat(calculateTotalExtraPayment())} a tu deuda. Si usas esta opción, ajustaremos el plazo y valor de cuota de tu crédito`
              : "Con estos valores no es posible registrar cuotas extraordinarias. Puedes continuar con la simulación."
          }
          appearance={extraordinaryQuotas.isAvailable ? "warning" : "help"}
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
            name="quotas"
            id="quotas"
            value={extraordinaryQuotas.quotas || ""}
            message={
              extraordinaryQuotas.quotas > extraordinaryQuotas.maxQuotas
                ? "Has superado la cantidad máxima de cuotas extraordinarias."
                : ""
            }
            type="number"
            disabled={loading}
            size="compact"
            fullwidth
            status={
              extraordinaryQuotas.quotas > extraordinaryQuotas.maxQuotas
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
            disabled={
              loading ||
              !extraordinaryQuotas.quotas ||
              extraordinaryQuotas.quotas > extraordinaryQuotas.maxQuotas
            }
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
