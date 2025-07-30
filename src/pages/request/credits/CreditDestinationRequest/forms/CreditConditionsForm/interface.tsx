import { BoxAttribute } from "@components/cards/BoxAttribute";
import { OutlineCard } from "@components/cards/OutlineCard";
import { CreditDisbursementModal } from "@components/modals/credit/CreditDisbursementModal";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import {
  Button,
  Divider,
  Fieldset,
  Grid,
  IOption,
  Message,
  Moneyfield,
  Numberfield,
  Select,
  Stack,
  Tabs,
  Text,
} from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { MdOpenInNew } from "react-icons/md";
import { periodicityDM } from "src/model/domains/general/periodicityDM";
import {
  currencyFormat,
  parseCurrencyString,
  validateCurrencyField,
} from "src/utils/currency";
import { getFieldState, isInvalid } from "src/utils/forms/forms";
import { simulatedTypeTabs } from "./config/tabs";
import { ICreditConditionsEntry } from "./types";

interface CreditConditionsFormUIProps {
  formik: FormikProps<ICreditConditionsEntry>;
  loading?: boolean;
  loadingSimulation?: boolean;
  showDisbursementModal: boolean;
  periodicityOptions: IOption[];
  simulateCredit: () => void;
  customHandleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onChangePaymentMethod: (name: string, value: string) => void;
  onChangePeriodicity: (name: string, value: string) => void;
  onToggleDisbursementModal: () => void;
  onTabChange: (tabId: string) => void;
}

function CreditConditionsFormUI(props: CreditConditionsFormUIProps) {
  const {
    formik,
    loading,
    loadingSimulation,
    showDisbursementModal,
    periodicityOptions,
    simulateCredit,
    customHandleChange,
    onFormValid,
    onChangePaymentMethod,
    onChangePeriodicity,
    onToggleDisbursementModal,
    onTabChange,
  } = props;

  const isTablet = useMediaQuery("(max-width: 1100px)");
  const isMobile = useMediaQuery("(max-width: 750px)");

  const handleChangeWithCurrency = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsedValue = parseCurrencyString(e.target.value);
    formik.setFieldValue(e.target.name, isNaN(parsedValue) ? "" : parsedValue);
    formik.setFieldValue("hasResult", false);
    onFormValid(false);
  };

  return (
    <>
      <form>
        <Stack direction="column" gap={inube.spacing.s400}>
          <Fieldset legend="Simulador de crédito">
            <Stack direction="column" gap={inube.spacing.s300} width="100%">
              <Stack direction="column" gap={inube.spacing.s200}>
                <Text type="title" size="small" appearance="gray">
                  Información del crédito
                </Text>

                <Grid
                  templateColumns={`repeat(${isMobile ? 1 : isTablet ? 2 : 3}, 1fr)`}
                  autoRows="auto"
                  gap={inube.spacing.s200}
                >
                  <OutlineCard>
                    <Stack
                      direction="column"
                      padding={`${inube.spacing.s150} ${inube.spacing.s200}`}
                      gap={inube.spacing.s025}
                    >
                      <Text type="label" size="medium">
                        Destinación:
                      </Text>
                      <Text type="body" size="medium" appearance="gray">
                        {formik.values.destination?.label}
                      </Text>
                    </Stack>
                  </OutlineCard>

                  <OutlineCard>
                    <Stack
                      direction="column"
                      padding={`${inube.spacing.s150} ${inube.spacing.s200}`}
                      gap={inube.spacing.s025}
                    >
                      <Text type="label" size="medium">
                        Producto:
                      </Text>
                      <Text type="body" size="medium" appearance="gray">
                        {formik.values.product.title}
                      </Text>
                    </Stack>
                  </OutlineCard>

                  <OutlineCard>
                    <Stack
                      direction="column"
                      padding={`${inube.spacing.s150} ${inube.spacing.s200}`}
                      gap={inube.spacing.s025}
                    >
                      <Text type="label" size="medium">
                        Monto minimo del producto:
                      </Text>
                      <Text type="body" size="medium" appearance="gray">
                        {currencyFormat(formik.values.product.minAmount)}
                      </Text>
                    </Stack>
                  </OutlineCard>

                  <OutlineCard>
                    <Stack
                      direction="column"
                      padding={`${inube.spacing.s150} ${inube.spacing.s200}`}
                      gap={inube.spacing.s025}
                    >
                      <Text type="label" size="medium">
                        Monto máximo del producto:
                      </Text>
                      <Text type="body" size="medium" appearance="gray">
                        {currencyFormat(formik.values.product.maxAmount)}
                      </Text>
                    </Stack>
                  </OutlineCard>

                  <OutlineCard>
                    <Stack
                      direction="column"
                      padding={`${inube.spacing.s150} ${inube.spacing.s200}`}
                      gap={inube.spacing.s025}
                    >
                      <Text type="label" size="medium">
                        Cupo personal:
                      </Text>
                      <Text type="body" size="medium" appearance="gray">
                        {currencyFormat(formik.values.product.maxAmountForUser)}
                      </Text>
                    </Stack>
                  </OutlineCard>
                </Grid>
              </Stack>

              <Divider dashed />

              <Tabs
                onChange={onTabChange}
                selectedTab={
                  formik.values.simulationWithQuota
                    ? simulatedTypeTabs.simulatedWithQuota.id
                    : simulatedTypeTabs.simulatedWithDeadline.id
                }
                tabs={Object.values(simulatedTypeTabs)}
              />

              <Stack direction="column" gap={inube.spacing.s200}>
                <Text type="title" size="small" appearance="gray">
                  Valores de la simulación
                </Text>

                <Stack direction="column" gap={inube.spacing.s200}>
                  <Grid
                    templateColumns={`repeat(${isMobile ? 1 : 2}, 1fr)`}
                    autoRows="auto"
                    gap={inube.spacing.s200}
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
                      message={formik.errors.paymentMethod}
                      onBlur={formik.handleBlur}
                      onChange={onChangePaymentMethod}
                      invalid={isInvalid(formik, "paymentMethod")}
                      fullwidth
                      placeholder="Selecciona un medio de pago"
                      disabled={formik.values.paymentMethods.length === 1}
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
                        !formik.values.paymentMethod?.value
                      }
                      invalid={isInvalid(formik, "periodicity")}
                      onChange={onChangePeriodicity}
                      placeholder="Selecciona una periodicidad"
                    />
                    {formik.values.product.id !== "generateRecommendation" && (
                      <>
                        {formik.values.simulationWithQuota ? (
                          <Moneyfield
                            label="Cuota"
                            placeholder="Ingresa el valor de la cuota"
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
                          />
                        ) : (
                          <Numberfield
                            label="¿Cuántas cuotas?"
                            placeholder="Ingresa la cantidad de cuotas"
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
                          />
                        )}
                      </>
                    )}
                  </Grid>

                  {formik.values.product.id !== "generateRecommendation" && (
                    <Stack width="100%" justifyContent="flex-end">
                      <Button
                        variant="outlined"
                        spacing="compact"
                        onClick={simulateCredit}
                        loading={loadingSimulation}
                        disabled={
                          !!formik.errors.amount ||
                          !!formik.errors.paymentMethod ||
                          !!formik.errors.periodicity ||
                          !formik.values.amount ||
                          !formik.values.paymentMethod?.id ||
                          formik.values.periodicity.id === "" ||
                          (formik.values.simulationWithQuota &&
                            !formik.values.quota) ||
                          (!formik.values.simulationWithQuota &&
                            !formik.values.deadline)
                        }
                      >
                        Simular
                      </Button>
                    </Stack>
                  )}
                </Stack>
              </Stack>

              {formik.values.hasResult && (
                <>
                  <Divider dashed />

                  <Stack direction="column" gap={inube.spacing.s200}>
                    <Text type="title" size="small" appearance="gray">
                      Resultados de la simulación
                    </Text>

                    <Message
                      title="Los resultados de esta simulación son aproximados. Los valores finales pueden variar y se definirán durante el trámite del crédito."
                      size={isMobile ? "medium" : "large"}
                      appearance="help"
                    />

                    <Grid
                      templateColumns={`repeat(${isMobile ? 1 : 2}, 1fr)`}
                      autoRows="auto"
                      gap={inube.spacing.s100}
                    >
                      <BoxAttribute
                        label="Cuota:"
                        value={`${currencyFormat(formik.values.quota || 0)} / ${periodicityDM.valueOf(formik.values.periodicity.id)?.value}`}
                      />
                      <BoxAttribute
                        label="Numero de cuotas:"
                        value={formik.values.deadline}
                      />
                      <BoxAttribute
                        label="Tasa de interés:"
                        value={`${formik.values.rate.toFixed(2)} % N.A.M.V`}
                      />
                      <BoxAttribute
                        label="Desembolso aproximado:"
                        buttonIcon={<MdOpenInNew />}
                        buttonValue={currencyFormat(formik.values.netValue)}
                        buttonDisabled={formik.values.netValue === 0}
                        onClickButton={onToggleDisbursementModal}
                        withButton
                      />
                    </Grid>
                  </Stack>
                </>
              )}
            </Stack>
          </Fieldset>
        </Stack>
      </form>

      {showDisbursementModal && (
        <CreditDisbursementModal
          approximateValue={formik.values.netValue}
          portalId="modals"
          spec={{
            amount: formik.values.amount || 0,
            anticipatedInterest: formik.values.anticipatedInterest,
            discounts: formik.values.discounts,
            charges: formik.values.charges,
          }}
          onCloseModal={onToggleDisbursementModal}
        />
      )}
    </>
  );
}

export { CreditConditionsFormUI };
