import { InfoCard } from "@components/cards/InfoCard";
import { inube } from "@design/tokens";
import { Button, Grid, IOption, Stack, Text } from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { useMemo } from "react";
import { currencyFormat } from "src/utils/currency";
import { ExtraordinaryQuotasStep } from "./steps/ExtraordinaryQuotasStep";
import { SimulationResultsStep } from "./steps/SimulationResultsStep";
import { SimulationValuesStep } from "./steps/SimulationValuesStep";
import { ESimulationStep, ISimulateCreditEntry } from "./types";

interface SimulateCreditFormUIProps {
  formik: FormikProps<ISimulateCreditEntry>;
  loading?: boolean;
  loadingContinue?: boolean;
  showDisbursementModal: boolean;
  periodicityOptions: IOption[];
  currentStep: ESimulationStep;
  simulateCredit: () => void;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onChangePaymentMethod: (name: string, value: string) => void;
  onChangePeriodicity: (name: string, value: string) => void;
  onToggleDisbursementModal: () => void;
  onSimulationTypeChange: (tabId: string) => void;
  onContinueStep: () => void;
  onReset: () => void;
}

function SimulateCreditFormUI(props: SimulateCreditFormUIProps) {
  const {
    formik,
    loading,
    loadingContinue,
    showDisbursementModal,
    periodicityOptions,
    currentStep,
    simulateCredit,
    onChangePaymentMethod,
    onChangePeriodicity,
    onToggleDisbursementModal,
    onSimulationTypeChange,
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

  const invalidContinue =
    !!formik.errors.amount ||
    !!formik.errors.paymentMethod ||
    !!formik.errors.periodicity ||
    !formik.values.amount ||
    !formik.values.paymentMethod?.id ||
    formik.values.periodicity.id === "" ||
    (formik.values.simulationWithQuota && !formik.values.quota) ||
    (!formik.values.simulationWithQuota && !formik.values.deadline);

  const isValidExtraordinaryQuotas =
    !formik.values.extraordinaryQuotas.isAvailable ||
    (formik.values.extraordinaryQuotas.isAvailable &&
      ((formik.values.extraordinaryQuotas.quotas === 0 &&
        formik.values.extraordinaryQuotas.valuePerQuota === 0) ||
        (formik.values.extraordinaryQuotas.quotas > 0 &&
          formik.values.extraordinaryQuotas.valuePerQuota > 0 &&
          formik.values.extraordinaryQuotas.quotas <=
            formik.values.extraordinaryQuotas.maxQuotas &&
          formik.values.extraordinaryQuotas.valuePerQuota <=
            formik.values.extraordinaryQuotas.maxValuePerQuota)));

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
            loading={loading || currentStep !== ESimulationStep.VALUES}
            periodicityOptions={periodicityOptions}
            onChangePaymentMethod={onChangePaymentMethod}
            onChangePeriodicity={onChangePeriodicity}
            onSimulationTypeChange={onSimulationTypeChange}
          />
        </Stack>

        {[
          ESimulationStep.EXTRAORDINARY_QUOTAS,
          ESimulationStep.SIMULATION,
          ESimulationStep.RESULTS,
        ].includes(currentStep) && (
          <ExtraordinaryQuotasStep
            formik={formik}
            loading={loadingContinue}
            showMessage={currentStep === ESimulationStep.EXTRAORDINARY_QUOTAS}
          />
        )}

        <Stack width="100%" justifyContent="flex-end" gap={inube.spacing.s150}>
          <Button
            variant="outlined"
            appearance="gray"
            spacing="compact"
            onClick={onReset}
            disabled={loading || loadingContinue}
          >
            Volver a empezar
          </Button>

          <Button
            variant="filled"
            appearance="primary"
            spacing="compact"
            onClick={
              ESimulationStep.VALUES === currentStep
                ? onContinueStep
                : simulateCredit
            }
            disabled={
              invalidContinue ||
              loading ||
              formik.values.hasResult ||
              !isValidExtraordinaryQuotas
            }
            loading={loadingContinue}
          >
            {ESimulationStep.VALUES === currentStep ? "Continuar" : "Simular"}
          </Button>
        </Stack>

        {currentStep === ESimulationStep.RESULTS && (
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
