import { InfoCard } from "@components/cards/InfoCard";
import { inube } from "@design/tokens";
import {
  Button,
  Grid,
  IOption,
  Stack,
  Text,
} from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { useMemo } from "react";
import { currencyFormat } from "src/utils/currency";
import { SimulationValuesStep } from "./steps/SimulationValuesStep";
import { ExtraordinaryQuotasStep } from "./steps/ExtraordinaryQuotasStep";
import { SimulationResultsStep } from "./steps/SimulationResultsStep";
import { ISimulateCreditEntry, ESimulationStep } from "./types";

interface SimulateCreditFormUIProps {
  formik: FormikProps<ISimulateCreditEntry>;
  loading?: boolean;
  loadingSimulation?: boolean;
  loadingStepTransition?: boolean;
  showDisbursementModal: boolean;
  periodicityOptions: IOption[];
  isFormValid: boolean;
  simulateCredit: () => void;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onChangePaymentMethod: (name: string, value: string) => void;
  onChangePeriodicity: (name: string, value: string) => void;
  onToggleDisbursementModal: () => void;
  onTabChange: (tabId: string) => void;
  onContinueStep: () => void;
  onReset: () => void;
}

function SimulateCreditFormUI(props: SimulateCreditFormUIProps) {
  const {
    formik,
    loading,
    loadingSimulation,
    loadingStepTransition,
    showDisbursementModal,
    periodicityOptions,
    isFormValid,
    simulateCredit,
    onChangePaymentMethod,
    onChangePeriodicity,
    onToggleDisbursementModal,
    onTabChange,
    onContinueStep,
    onReset,
  } = props;

  const infoCardsData = useMemo(
    () => [
      { label: "Destinación:", value: formik.values.destination?.label ?? "" },
      { label: "Producto:", value: formik.values.product.title },
      {
        label: "Monto mínimo del producto:",
        value: currencyFormat(formik.values.product.minAmount),
      },
      {
        label: "Monto máximo del producto:",
        value: currencyFormat(formik.values.product.maxAmount),
      },
    ],
    [
      formik.values.destination?.label,
      formik.values.product.title,
      formik.values.product.minAmount,
      formik.values.product.maxAmount,
    ],
  );

  const isStep1Disabled = formik.values.currentStep !== ESimulationStep.VALUES;

  const isExtraordinaryQuotasValid =
    !formik.values.extraordinaryQuotas.isAvailable ||
    (formik.values.extraordinaryQuotas.quantity > 0 &&
      formik.values.extraordinaryQuotas.valuePerQuota > 0 &&
      formik.values.extraordinaryQuotas.quantity <= formik.values.extraordinaryQuotas.maxQuantity &&
      formik.values.extraordinaryQuotas.valuePerQuota <= formik.values.extraordinaryQuotas.maxValuePerQuota) ||
    (formik.values.extraordinaryQuotas.quantity === 0 && formik.values.extraordinaryQuotas.valuePerQuota === 0);

  return (
    <form>
      <Stack direction="column" gap={inube.spacing.s400}>
        <Stack direction="column" gap={inube.spacing.s250}>
          <Text type="title" size="medium" appearance="gray" weight="bold">
            Simulador de crédito
          </Text>
          <Grid
            templateColumns={`repeat(2, 1fr)`}
            autoRows="auto"
            gap={inube.spacing.s200}
            width="100%"
          >
            {infoCardsData.map((infoCard, index) => (

              <InfoCard
                key={index}
                label={infoCard.label}
                value={infoCard.value}
              />
            ))}
          </Grid>
        </Stack>

        <Stack direction="column" gap={inube.spacing.s250}>
          <Text type="title" size="medium" appearance="gray" weight="bold">
            Valores de la simulación
          </Text>

          <SimulationValuesStep
            formik={formik}
            loading={loading || isStep1Disabled}
            periodicityOptions={periodicityOptions}
            onChangePaymentMethod={onChangePaymentMethod}
            onChangePeriodicity={onChangePeriodicity}
            onTabChange={onTabChange}
          />
        </Stack>

        {formik.values.currentStep >=
          ESimulationStep.EXTRAORDINARY_QUOTAS && (
            <ExtraordinaryQuotasStep
              formik={formik}
              loading={loadingSimulation || formik.values.currentStep === ESimulationStep.RESULTS}
              showMessage={formik.values.currentStep === ESimulationStep.EXTRAORDINARY_QUOTAS}
            />
          )}

        <Stack width="100%" justifyContent="flex-end" gap={inube.spacing.s150}>
          <Button
            variant="outlined"
            appearance="gray"
            spacing="compact"
            onClick={onReset}
            disabled={loading || loadingSimulation}
          >
            Volver a empezar
          </Button>
          {formik.values.currentStep === ESimulationStep.VALUES && (
            <Button
              variant="filled"
              appearance="primary"
              spacing="compact"
              onClick={onContinueStep}
              disabled={!isFormValid || loading}
              loading={loadingStepTransition}
            >
              Continuar
            </Button>
          )}
          {formik.values.currentStep >= ESimulationStep.EXTRAORDINARY_QUOTAS && (
            <Button
              variant="filled"
              appearance="primary"
              spacing="compact"
              onClick={simulateCredit}
              disabled={
                formik.values.currentStep === ESimulationStep.RESULTS ||
                !isExtraordinaryQuotasValid ||
                loadingSimulation
              }
              loading={loadingSimulation}
            >
              Simular
            </Button>
          )}
        </Stack>

        {formik.values.currentStep === ESimulationStep.RESULTS && (
          <SimulationResultsStep
            formik={formik}
            showDisbursementModal={showDisbursementModal}
            onToggleDisbursementModal={onToggleDisbursementModal}
          />
        )}
      </Stack>
    </form>
  );
}

export { SimulateCreditFormUI };
