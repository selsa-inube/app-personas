import { inube } from "@design/tokens";
import {
  Grid,
  IOption,
  Moneyfield,
  Numberfield,
  Select,
  Stack,
} from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { parseCurrencyString, validateCurrencyField } from "src/utils/currency";
import { getFieldState, isInvalid } from "src/utils/forms/forms";
import { ISimulateCreditEntry } from "../../types";

const simulationTypes = {
  byQuota: {
    id: "simulatedWithQuota",
    label: "Simular por valor de la cuota",
  },
  byDeadline: {
    id: "simulatedWithDeadline",
    label: "Simular por plazo",
  },
};

interface ISimulationValuesStepProps {
  formik: FormikProps<ISimulateCreditEntry>;
  loading?: boolean;
  periodicityOptions: IOption[];
  onChangePaymentMethod: (name: string, value: string) => void;
  onChangePeriodicity: (name: string, value: string) => void;
  onSimulationTypeChange: (tabId: string) => void;
}

function SimulationValuesStep(props: ISimulationValuesStepProps) {
  const {
    formik,
    loading,
    periodicityOptions,
    onChangePaymentMethod,
    onChangePeriodicity,
    onSimulationTypeChange,
  } = props;

  const handleChangeWithCurrency = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsedValue = parseCurrencyString(e.target.value);
    formik.setFieldValue(e.target.name, isNaN(parsedValue) ? "" : parsedValue);
  };

  const customHandleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    formik.handleChange(event);
  };

  return (
    <Stack direction="column" gap={inube.spacing.s250}>
      <Grid
        templateColumns={`repeat(2, 1fr)`}
        autoRows="auto"
        gap={inube.spacing.s200}
        width="100%"
      >
        <Moneyfield
          label="Monto"
          placeholder="Ingresa el valor del crédito"
          name="amount"
          id="amount"
          value={validateCurrencyField("amount", formik) || ""}
          message={formik.errors.amount}
          disabled={loading}
          size="compact"
          fullwidth
          status={getFieldState(formik, "amount")}
          onBlur={formik.handleBlur}
          onChange={handleChangeWithCurrency}
          required
        />
        <Select
          id="paymentMethod"
          name="paymentMethod"
          label="Medio de pago"
          size="compact"
          value={formik.values.paymentMethod?.id || ""}
          options={formik.values.paymentMethods || []}
          message={formik.errors.paymentMethod as string}
          onBlur={formik.handleBlur}
          onChange={onChangePaymentMethod}
          invalid={isInvalid(formik, "paymentMethod")}
          fullwidth
          placeholder="Selecciona un medio de pago"
          disabled={formik.values.paymentMethods.length === 1 || loading}
          required
        />
        <Select
          label="Periodicidad"
          name="periodicity"
          id="periodicity"
          value={formik.values.periodicity.id}
          size="compact"
          fullwidth
          options={periodicityOptions}
          onBlur={formik.handleBlur}
          message={formik.errors.periodicity?.id}
          disabled={
            periodicityOptions.length === 1 ||
            !formik.values.paymentMethod?.value ||
            loading
          }
          invalid={isInvalid(formik, "periodicity")}
          onChange={onChangePeriodicity}
          placeholder="Selecciona una periodicidad"
          required
        />
        <Select
          label="Tipo de simulación"
          name="simulationType"
          id="simulationType"
          value={
            formik.values.simulationWithQuota
              ? simulationTypes.byQuota.id
              : simulationTypes.byDeadline.id
          }
          size="compact"
          fullwidth
          options={Object.values(simulationTypes).map((type) => ({
            id: type.id,
            label: type.label,
            value: type.id,
          }))}
          onChange={(name, value) => onSimulationTypeChange(value)}
          placeholder="Selecciona el tipo de simulación"
          disabled={loading}
          required
        />
        {formik.values.simulationWithQuota ? (
          <Moneyfield
            label="¿Cuál es el valor de la cuota?"
            placeholder="Digita el valor de la cuota"
            name="quota"
            id="quota"
            value={validateCurrencyField("quota", formik) || ""}
            message={formik.errors.quota}
            disabled={loading}
            size="compact"
            fullwidth
            status={getFieldState(formik, "quota")}
            onBlur={formik.handleBlur}
            onChange={handleChangeWithCurrency}
            required
          />
        ) : (
          <Numberfield
            label="¿Cuántas cuotas?"
            placeholder="Digita la cantidad de cuotas"
            name="deadline"
            id="deadline"
            value={formik.values.deadline || ""}
            message={formik.errors.deadline}
            disabled={loading}
            size="compact"
            fullwidth
            status={getFieldState(formik, "deadline")}
            onBlur={formik.handleBlur}
            onChange={customHandleChange}
            required
            type="number"
          />
        )}
      </Grid>
    </Stack>
  );
}

export { SimulationValuesStep };
export type { ISimulationValuesStepProps };
