import { BoxAttribute } from "@components/cards/BoxAttribute";
import { Text } from "@design/data/Text";
import { Button } from "@design/input/Button";
import { Fieldset } from "@design/input/Fieldset";
import { Select } from "@design/input/Select";
import { Switch } from "@design/input/Switch";
import { TextField } from "@design/input/TextField";
import { Divider } from "@design/layout/Divider";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { getDomainById } from "@mocks/domains/domainService.mocks";
import { maximumQuotasAvailableMock } from "@mocks/products/credits/request.mocks";
import { FormikValues } from "formik";
import { MdAttachMoney } from "react-icons/md";
import { peridiocityDM } from "src/model/domains/general/peridiocity";
import {
  currencyFormat,
  parseCurrencyString,
  validateCurrencyField,
} from "src/utils/currency";
import { getFieldState } from "src/utils/forms/forms";
import { StyledList } from "./styles";

const creditDestinationDM = getDomainById("creditDestination");
const creditProductTypeDM = getDomainById("creditProductType");
interface CreditConditionsFormUIProps {
  formik: FormikValues;
  loading?: boolean;
  interestRate: number;
  loadingSimulation?: boolean;
  simulateCredit: () => void;
  customHandleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
}

function CreditConditionsFormUI(props: CreditConditionsFormUIProps) {
  const {
    formik,
    loading,
    interestRate,
    loadingSimulation,
    simulateCredit,
    customHandleChange,
    onFormValid,
  } = props;

  const isMobile = useMediaQuery("(max-width: 750px)");

  const maximumQuotas =
    maximumQuotasAvailableMock[
      formik.values.creditDestination as keyof typeof maximumQuotasAvailableMock
    ];

  const handleChangeWithCurrency = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsedValue = parseCurrencyString(e.target.value);
    formik.setFieldValue(e.target.name, isNaN(parsedValue) ? "" : parsedValue);
    formik.setFieldValue("hasResult", false);
    onFormValid(false);
  };

  return (
    <form>
      <Stack direction="column" gap="s400">
        <Fieldset
          title="Caracteristicas"
          type={isMobile ? "label" : "title"}
          size={isMobile ? "medium" : "small"}
        >
          <Stack direction="column" gap="s300">
            <Grid gap="s300" templateColumns={isMobile ? "1fr" : "1fr 1fr"}>
              <Select
                label="Destinación"
                name="creditDestination"
                id="creditDestination"
                placeholder=""
                value={formik.values.creditDestination}
                options={creditDestinationDM}
                isDisabled={loading}
                size="compact"
                isFullWidth
                readOnly
              />

              <Select
                label="Producto"
                name="product"
                id="product"
                placeholder=""
                value={formik.values.product}
                options={creditProductTypeDM}
                isDisabled={loading}
                size="compact"
                isFullWidth
                readOnly
              />
            </Grid>

            <Stack direction="column" gap="s250">
              <Text type="title" size="small">
                Cupos máximos disponibles
              </Text>

              <StyledList>
                <Stack justifyContent="space-between">
                  <Text type="label" size="medium">
                    Sin garantía:
                  </Text>
                  <Text type="body" size="medium" appearance="gray">
                    {currencyFormat(maximumQuotas.noWarranty)}
                  </Text>
                </Stack>

                <Divider dashed />

                <Stack justifyContent="space-between">
                  <Text type="label" size="medium">
                    Con codeudores:
                  </Text>
                  <Text type="body" size="medium" appearance="gray">
                    {currencyFormat(maximumQuotas.withCoDebtors)}
                  </Text>
                </Stack>

                <Divider dashed />

                <Stack justifyContent="space-between">
                  <Text type="label" size="medium">
                    Con afianzamiento:
                  </Text>
                  <Text type="body" size="medium" appearance="gray">
                    {currencyFormat(maximumQuotas.withStrengthening)}
                  </Text>
                </Stack>

                <Divider dashed />

                <Stack justifyContent="space-between">
                  <Text type="label" size="medium">
                    Garantía real:
                  </Text>
                  <Text type="body" size="medium" appearance="gray">
                    {currencyFormat(maximumQuotas.realWarranty)}
                  </Text>
                </Stack>
              </StyledList>
            </Stack>
          </Stack>
        </Fieldset>

        <Fieldset
          title={
            formik.values.product === "generateRecommendation"
              ? "Valor de crédito"
              : "Simulador de crédito"
          }
          type={isMobile ? "label" : "title"}
          size={isMobile ? "medium" : "small"}
        >
          <Stack direction="column" gap="s250">
            <Stack direction="column" gap="s200">
              {formik.values.product !== "generateRecommendation" && (
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

              <Grid gap="s300" templateColumns={isMobile ? "1fr" : "1fr 1fr"}>
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
                  onFocus={formik.handleFocus}
                  onChange={handleChangeWithCurrency}
                  validMessage="El valor es válido"
                  isRequired
                />
                {formik.values.product !== "generateRecommendation" && (
                  <>
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
                  </>
                )}
              </Grid>
              {formik.values.product !== "generateRecommendation" && (
                <Stack width="100%" justifyContent="flex-end">
                  <Button
                    variant="outlined"
                    onClick={simulateCredit}
                    load={loadingSimulation}
                    disabled={
                      !formik.values.amount ||
                      !formik.values.peridiocity ||
                      (!formik.values.deadline && !formik.values.quota)
                    }
                  >
                    Simular
                  </Button>
                </Stack>
              )}
            </Stack>

            {formik.values.hasResult && (
              <>
                <Divider dashed />

                <Stack direction="column" gap="s300">
                  <Text type="title" size="small">
                    Resultados de la simulación
                  </Text>
                  <Stack direction="column" gap="s150">
                    <BoxAttribute
                      label="Cuota mensual:"
                      value={`${currencyFormat(formik.values.quota)}`}
                    />
                    <BoxAttribute
                      label="Plazo:"
                      value={`${formik.values.deadline} Meses`}
                    />
                    <BoxAttribute
                      label="Tasa de interés:"
                      value={`${interestRate} % N.M.V`}
                    />
                    <BoxAttribute
                      label="Intereses de ajuste al ciclo:"
                      value={`${currencyFormat(formik.values.cycleInterest)}`}
                    />
                    <BoxAttribute
                      label="Valor neto a recibir:"
                      value={`${currencyFormat(formik.values.netValue)}`}
                    />
                  </Stack>
                </Stack>
              </>
            )}
          </Stack>
        </Fieldset>
      </Stack>
    </form>
  );
}

export { CreditConditionsFormUI };
