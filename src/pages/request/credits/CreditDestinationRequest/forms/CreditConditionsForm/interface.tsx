import { BoxAttribute } from "@components/cards/BoxAttribute";
import { OutlineCard } from "@components/cards/OutlineCard";
import { CreditDisbursementModal } from "@components/modals/credit/CreditDisbursementModal";
import { Button } from "@design/input/Button";
import { Fieldset } from "@design/input/Fieldset";
import { Select } from "@design/input/Select";
import { Switch } from "@design/input/Switch";
import { TextField } from "@design/input/TextField";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Divider } from "@inubekit/divider";
import { Grid } from "@inubekit/grid";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { FormikProps } from "formik";
import { MdAttachMoney, MdOpenInNew } from "react-icons/md";
import {
  currencyFormat,
  parseCurrencyString,
  validateCurrencyField,
} from "src/utils/currency";
import { getFieldState } from "src/utils/forms/forms";
import { ICreditConditionsEntry, IDisbursementModalState } from "./types";
import { periodicityDM } from "src/model/domains/general/periodicityDM";

interface CreditConditionsFormUIProps {
  formik: FormikProps<ICreditConditionsEntry>;
  loading?: boolean;
  loadingSimulation?: boolean;
  disbursementModal: IDisbursementModalState;
  simulateCredit: () => void;
  customHandleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onChangePaymentMethod: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onChangePeriodicity: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onToggleDisbursementModal: () => void;
}

function CreditConditionsFormUI(props: CreditConditionsFormUIProps) {
  const {
    formik,
    loading,
    loadingSimulation,
    disbursementModal,
    simulateCredit,
    customHandleChange,
    onFormValid,
    onChangePaymentMethod,
    onChangePeriodicity,
    onToggleDisbursementModal,
  } = props;

  const isMobile = useMediaQuery("(max-width: 750px)");

  const handleChangeWithCurrency = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsedValue = parseCurrencyString(e.target.value);
    formik.setFieldValue(e.target.name, isNaN(parsedValue) ? "" : parsedValue);
    formik.setFieldValue("hasResult", false);
    onFormValid(false);
  };

  const periodicityOptions = formik.values.periodicities.map((option) => {
    const matchedDomain = periodicityDM.valueOf(option.code);
    return matchedDomain
      ? { id: matchedDomain.id, value: matchedDomain.value }
      : { id: option.code, value: option.code };
  });

  return (
    <>
      <form>
        <Stack direction="column" gap={inube.spacing.s400}>
          <Fieldset
            title="Simulador de crédito"
            type={isMobile ? "label" : "title"}
            size={isMobile ? "medium" : "small"}
          >
            <Stack direction="column" gap={inube.spacing.s300}>
              <Stack direction="column" gap={inube.spacing.s200}>
                <Text type="title" size="small" appearance="gray">
                  Información del crédito
                </Text>

                <Grid
                  templateColumns={`repeat(${isMobile ? 1 : 2}, 1fr)`}
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
                        {formik.values.creditDestination?.value}
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
                        Monto máximo:
                      </Text>
                      <Text type="body" size="medium" appearance="gray">
                        {currencyFormat(formik.values.product.maxAmount)}
                      </Text>
                    </Stack>
                  </OutlineCard>
                </Grid>
              </Stack>

              <Divider dashed />

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
                      value={validateCurrencyField("amount", formik)}
                      type="text"
                      errorMessage={formik.errors.amount}
                      isDisabled={loading}
                      size="compact"
                      isFullWidth
                      state={getFieldState(formik, "amount")}
                      onBlur={formik.handleBlur}
                      onChange={handleChangeWithCurrency}
                      validMessage="El valor es válido"
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
                    />
                    <Select
                      label="Periodicidad"
                      name="periodicity"
                      id="periodicity"
                      value={formik.values.periodicity.code}
                      size="compact"
                      isFullWidth
                      options={periodicityOptions}
                      onBlur={formik.handleBlur}
                      errorMessage={formik.errors.periodicity?.code}
                      isDisabled={!formik.values.paymentMethod?.value}
                      state={getFieldState(formik, "periodicity")}
                      onChange={onChangePeriodicity}
                    />
                    {formik.values.product.id !== "generateRecommendation" && (
                      <>
                        {formik.values.simulationWithQuota ? (
                          <TextField
                            label="Cuota"
                            placeholder="Ingresa el valor de la cuota"
                            name="quota"
                            id="quota"
                            value={validateCurrencyField("quota", formik)}
                            type="text"
                            errorMessage={formik.errors.quota}
                            isDisabled={loading}
                            size="compact"
                            isFullWidth
                            state={getFieldState(formik, "quota")}
                            onBlur={formik.handleBlur}
                            onChange={handleChangeWithCurrency}
                            validMessage="La cuota es válida"
                          />
                        ) : (
                          <TextField
                            label="Plazo en meses"
                            placeholder="Ingresa la cantidad de meses"
                            name="deadlineTerm"
                            id="deadlineTerm"
                            value={formik.values.deadlineTerm}
                            type="number"
                            errorMessage={formik.errors.deadlineTerm}
                            isDisabled={loading}
                            size="compact"
                            isFullWidth
                            state={getFieldState(formik, "deadlineTerm")}
                            onBlur={formik.handleBlur}
                            onChange={customHandleChange}
                            validMessage="El plazo es válido"
                          />
                        )}
                      </>
                    )}
                  </Grid>
                  {formik.values.product.id !== "generateRecommendation" && (
                    <Stack
                      padding={`${inube.spacing.s050} ${inube.spacing.s200}`}
                      gap={inube.spacing.s100}
                    >
                      <Switch
                        id="simulationWithQuota"
                        name="simulationWithQuota"
                        onChange={customHandleChange}
                        checked={formik.values.simulationWithQuota}
                        label="Simular con el valor de la cuota"
                        margin="0"
                        padding="0"
                        size="large"
                      />
                    </Stack>
                  )}

                  {formik.values.product.id !== "generateRecommendation" && (
                    <Stack width="100%" justifyContent="flex-end">
                      <Button
                        variant="outlined"
                        spacing="compact"
                        onClick={simulateCredit}
                        load={loadingSimulation}
                        disabled={
                          !!formik.errors.amount ||
                          formik.values.paymentMethod?.id === undefined ||
                          formik.values.periodicity.code === ""
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
                        value={`${currencyFormat(formik.values.quota)} / Mensual`}
                      />
                      <BoxAttribute
                        label="Plazo en meses:"
                        value={`${formik.values.deadlineTerm || formik.values.calculatedQuotaDeadline} Meses`}
                      />
                      <BoxAttribute
                        label="Tasa de interés:"
                        value={`${formik.values.product.maxRate} % N.A.M.V`}
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

      {disbursementModal.show && disbursementModal.data && (
        <CreditDisbursementModal
          approximateValue={disbursementModal.data.approximateValue}
          portalId="modals"
          spec={{
            amount: disbursementModal.data.spec.amount,
            cycleInterest: disbursementModal.data.spec.cycleInterest,
            discounts: disbursementModal.data.spec.discounts,
            charges: disbursementModal.data.spec.charges,
          }}
          onCloseModal={onToggleDisbursementModal}
        />
      )}
    </>
  );
}

export { CreditConditionsFormUI };
