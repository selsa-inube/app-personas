import { BoxAttribute } from "@components/cards/BoxAttribute";
import { OutlineCard } from "@components/cards/OutlineCard";
import { CreditDisbursementModal } from "@components/modals/credit/CreditDisbursementModal";
import { Select } from "@design/input/Select";
import { ISelectOption } from "@design/input/Select/types";
import { TextField } from "@design/input/TextField";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Button } from "@inubekit/button";
import { Fieldset } from "@inubekit/fieldset";
import { Divider, Grid, Stack, Text } from "@inubekit/inubekit";
import { Tabs } from "@inubekit/tabs";
import { FormikProps } from "formik";
import { MdAttachMoney, MdOpenInNew } from "react-icons/md";
import {
  currencyFormat,
  parseCurrencyString,
  validateCurrencyField,
} from "src/utils/currency";
import { getFieldState } from "src/utils/forms/forms";
import { simulatedTypeTabs } from "./config/tabs";
import { ICreditConditionsEntry } from "./types";

interface CreditConditionsFormUIProps {
  formik: FormikProps<ICreditConditionsEntry>;
  loading?: boolean;
  loadingSimulation?: boolean;
  showDisbursementModal: boolean;
  periodicityOptions: ISelectOption[];
  simulateCredit: () => void;
  customHandleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onChangePaymentMethod: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onChangePeriodicity: (event: React.ChangeEvent<HTMLSelectElement>) => void;
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
          <Fieldset
            legend="Simulador de crédito"
            type={isMobile ? "label" : "title"}
            size={isMobile ? "medium" : "small"}
          >
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
                        {formik.values.destination?.value}
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
                    <TextField
                      label="Monto"
                      placeholder="Ingresa el valor del crédito"
                      name="amount"
                      id="amount"
                      iconAfter={<MdAttachMoney size={18} />}
                      value={validateCurrencyField("amount", formik) || ""}
                      type="text"
                      errorMessage={formik.errors.amount}
                      isDisabled={loading}
                      size="compact"
                      isFullWidth
                      state={getFieldState(formik, "amount")}
                      onBlur={formik.handleBlur}
                      onChange={handleChangeWithCurrency}
                      isRequired
                    />
                    <Select
                      id="paymentMethod"
                      name="paymentMethod"
                      label="Medio de pago"
                      size="compact"
                      value={formik.values.paymentMethod?.id || ""}
                      options={formik.values.paymentMethods || []}
                      errorMessage={formik.errors.paymentMethod}
                      onBlur={formik.handleBlur}
                      onChange={onChangePaymentMethod}
                      state={getFieldState(formik, "paymentMethod")}
                      isFullWidth
                      readOnly={formik.values.paymentMethods.length === 1}
                    />
                    <Select
                      label="Periodicidad"
                      name="periodicity"
                      id="periodicity"
                      value={formik.values.periodicity.id}
                      size="compact"
                      isFullWidth
                      options={periodicityOptions}
                      onBlur={formik.handleBlur}
                      errorMessage={formik.errors.periodicity?.id}
                      isDisabled={!formik.values.paymentMethod?.value}
                      state={getFieldState(formik, "periodicity")}
                      onChange={onChangePeriodicity}
                      readOnly={periodicityOptions.length === 1}
                    />
                    {formik.values.product.id !== "generateRecommendation" && (
                      <>
                        {formik.values.simulationWithQuota ? (
                          <TextField
                            label="Cuota"
                            placeholder="Ingresa el valor de la cuota"
                            name="quota"
                            id="quota"
                            value={validateCurrencyField("quota", formik) || ""}
                            type="text"
                            errorMessage={formik.errors.quota}
                            isDisabled={loading}
                            size="compact"
                            isFullWidth
                            state={getFieldState(formik, "quota")}
                            onBlur={formik.handleBlur}
                            onChange={handleChangeWithCurrency}
                          />
                        ) : (
                          <TextField
                            label="¿Cuántas cuotas?"
                            placeholder="Ingresa la cantidad de cuotas"
                            name="deadline"
                            id="deadline"
                            value={formik.values.deadline || ""}
                            type="number"
                            errorMessage={formik.errors.deadline}
                            isDisabled={loading}
                            size="compact"
                            isFullWidth
                            state={getFieldState(formik, "deadline")}
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

                    <Grid
                      templateColumns={`repeat(${isMobile ? 1 : 2}, 1fr)`}
                      autoRows="auto"
                      gap={inube.spacing.s100}
                    >
                      <BoxAttribute
                        label="Cuota:"
                        value={`${currencyFormat(formik.values.quota || 0)} / Mensual`}
                      />
                      <BoxAttribute
                        label="Numero de cuotas:"
                        value={`${formik.values.deadline} Meses`}
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
