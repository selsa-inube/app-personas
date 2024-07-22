import { BoxAttribute } from "@components/cards/BoxAttribute";
import { OutlineCard } from "@components/cards/OutlineCard";
import { CreditDisbursementModal } from "@components/modals/credit/CreditDisbursementModal";
import { Text } from "@design/data/Text";
import { Button } from "@design/input/Button";
import { Fieldset } from "@design/input/Fieldset";
import { Select } from "@design/input/Select";
import { Switch } from "@design/input/Switch";
import { TextField } from "@design/input/TextField";
import { Stack } from "@design/layout/Stack";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { FormikProps } from "formik";
import { MdAttachMoney, MdOpenInNew } from "react-icons/md";
import { peridiocityDM } from "src/model/domains/general/peridiocityDM";
import {
  currencyFormat,
  parseCurrencyString,
  validateCurrencyField,
} from "src/utils/currency";
import { getFieldState } from "src/utils/forms/forms";
import { ICreditConditionsEntry, IDisbursementModalState } from "./types";
import { Divider } from "@inubekit/divider";
import { Grid } from "@inubekit/grid";

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
    onToggleDisbursementModal,
  } = props;

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
        <Stack direction="column" gap="s400">
          <Fieldset
            title="Simulador de crédito"
            type={isMobile ? "label" : "title"}
            size={isMobile ? "medium" : "small"}
          >
            <Stack direction="column" gap="s300">
              <Stack direction="column" gap="s200">
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
                      gap="s025"
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
                      gap="s025"
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
                      gap="s025"
                    >
                      <Text type="label" size="medium">
                        Cupo máximo sin garantía:
                      </Text>
                      <Text type="body" size="medium" appearance="gray">
                        {currencyFormat(formik.values.product.maxAmount)}
                      </Text>
                    </Stack>
                  </OutlineCard>
                </Grid>
              </Stack>

              <Divider dashed />

              <Stack direction="column" gap="s200">
                <Text type="title" size="small" appearance="gray">
                  Valores de la simulación
                </Text>

                <Stack direction="column" gap="s200">
                  {formik.values.product.id !== "generateRecommendation" && (
                    <Stack
                      padding={`${inube.spacing.s050} ${inube.spacing.s200}`}
                      gap="s100"
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

                  <Grid
                    templateColumns={`repeat(${isMobile ? 1 : 2}, 1fr)`}
                    autoRows="auto"
                    gap={inube.spacing.s200}
                  >
                    <TextField
                      label="¿Cuánto dinero necesitas?"
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
                            label="Plazo"
                            placeholder="Ingresa la cantidad de meses"
                            name="deadline"
                            id="deadline"
                            value={formik.values.deadline}
                            type="number"
                            errorMessage={formik.errors.deadline}
                            isDisabled={loading}
                            size="compact"
                            isFullWidth
                            state={getFieldState(formik, "deadline")}
                            onBlur={formik.handleBlur}
                            onChange={customHandleChange}
                            validMessage="El plazo es válido"
                          />
                        )}

                        <Select
                          label="Periodicidad"
                          name="peridiocity"
                          id="peridiocity"
                          value={formik.values.peridiocity}
                          size="compact"
                          isFullWidth
                          options={peridiocityDM.options}
                          onBlur={formik.handleBlur}
                          errorMessage={formik.errors.peridiocity}
                          isDisabled={loading}
                          state={getFieldState(formik, "peridiocity")}
                          onChange={customHandleChange}
                          readOnly
                        />
                      </>
                    )}
                  </Grid>

                  {formik.values.product.id !== "generateRecommendation" && (
                    <Stack width="100%" justifyContent="flex-end">
                      <Button
                        variant="outlined"
                        spacing="compact"
                        onClick={simulateCredit}
                        load={loadingSimulation}
                        disabled={
                          !formik.values.amount ||
                          !formik.values.peridiocity ||
                          (!formik.values.deadline && !formik.values.quota) ||
                          !!formik.errors.deadline
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

                  <Stack direction="column" gap="s200">
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
                        value={`${currencyFormat(formik.values.quota)} / ${
                          peridiocityDM.valueOf(formik.values.peridiocity)
                            ?.value
                        }`}
                      />
                      <BoxAttribute
                        label="Plazo:"
                        value={`${formik.values.deadline} Meses`}
                      />
                      <BoxAttribute
                        label="Tasa de interés:"
                        value={`${formik.values.product.maxRate} % N.M.V`}
                      />
                      <BoxAttribute
                        label="Garantía mínima requerida:"
                        value={formik.values.minWarrantyRequired}
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
          }}
          onCloseModal={onToggleDisbursementModal}
        />
      )}
    </>
  );
}

export { CreditConditionsFormUI };
