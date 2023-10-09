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
import { peridiocityDM } from "src/model/domains/general/peridiocity";
import { currencyFormat, parseCurrencyString } from "src/utils/formats";
import { StyledList } from "./styles";
import { ISimulatedCreditState } from "./types";

interface SimulationFormUIProps {
  formik: FormikValues;
  loading?: boolean;
  interestRate: number;
  simulatedCredit?: ISimulatedCreditState;
  loadingSimulation?: boolean;
  customHandleChange: (fieldName: string, value: string) => void;
  simulateCredit: () => void;
}

function SimulationFormUI(props: SimulationFormUIProps) {
  const {
    formik,
    loading,
    interestRate,
    simulatedCredit,
    loadingSimulation,
    customHandleChange,
    simulateCredit,
  } = props;

  function stateValue(attribute: string) {
    if (!formik.touched[attribute]) return "pending";
    if (formik.touched[attribute] && formik.errors[attribute]) return "invalid";
    return "valid";
  }

  const isMobile = useMediaQuery("(max-width: 750px)");

  const creditDestinationDM = getDomainById("creditDestination");
  const creditProductTypeDM = getDomainById("creditProductType");

  const maximumQuotas =
    maximumQuotasAvailableMock[
      formik.values.creditDestination as keyof typeof maximumQuotasAvailableMock
    ];

  const handleChangeWithCurrency = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsedValue = parseCurrencyString(e.target.value);
    formik.setFieldValue(e.target.name, isNaN(parsedValue) ? "" : parsedValue);
  };

  const validateCurrencyField = (fieldName: string) => {
    return typeof formik.values[fieldName] === "number"
      ? currencyFormat(formik.values[fieldName])
      : "";
  };

  return (
    <form>
      <Stack direction="column" gap="s400">
        <Fieldset title="Caracteristicas">
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
                    Garantía personal:
                  </Text>
                  <Text type="body" size="medium" appearance="gray">
                    {currencyFormat(maximumQuotas.personalWarranty)}
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

        <Fieldset title="Simulador de crédito">
          <Stack direction="column" gap="s250">
            <Stack direction="column" gap="s200">
              <Stack
                padding={`${inube.spacing.s050} ${inube.spacing.s200}`}
                gap="s100"
              >
                <Switch
                  id="simulationWithQuota"
                  name="simulationWithQuota"
                  handleChange={formik.handleChange}
                  checked={formik.values.simulationWithQuota}
                  label="Simular con el valor de la cuota"
                  margin="0"
                  padding="0"
                  size="large"
                />
              </Stack>

              <Grid gap="s300" templateColumns={isMobile ? "1fr" : "1fr 1fr"}>
                <TextField
                  label="¿Cuánto dinero necesitas?"
                  placeholder="Ingresa el valor del crédito"
                  name="amount"
                  id="amount"
                  value={validateCurrencyField("amount")}
                  type="text"
                  errorMessage={formik.errors.amount}
                  isDisabled={loading}
                  size="compact"
                  isFullWidth
                  state={stateValue("amount")}
                  handleBlur={formik.handleBlur}
                  handleChange={handleChangeWithCurrency}
                  validMessage="El valor es válido"
                  isRequired
                />

                <Select
                  label="Periodicidad"
                  name="peridiocity"
                  id="peridiocity"
                  value={peridiocityDM.MONTHLY.id}
                  size="compact"
                  isFullWidth
                  options={peridiocityDM.options}
                  handleBlur={formik.handleBlur}
                  errorMessage={formik.errors.peridiocity}
                  isDisabled={loading}
                  state={stateValue("peridiocity")}
                  handleChange={formik.handleChange}
                  readOnly
                />

                <TextField
                  label="Plazo"
                  placeholder="Ingresa la cantidad de meses"
                  name="deadline"
                  id="deadline"
                  value={formik.values.deadline}
                  type="text"
                  errorMessage={formik.errors.deadline}
                  isDisabled={loading}
                  size="compact"
                  isFullWidth
                  state={stateValue("deadline")}
                  handleBlur={formik.handleBlur}
                  handleChange={formik.handleChange}
                  validMessage="El plazo es válido"
                  isRequired
                />
              </Grid>

              <Stack width="100%" justifyContent="flex-end">
                <Button
                  variant="outlined"
                  handleClick={simulateCredit}
                  load={loadingSimulation}
                >
                  Simular
                </Button>
              </Stack>
            </Stack>

            {simulatedCredit && (
              <>
                <Divider dashed />

                <Stack direction="column" gap="s300">
                  <Text type="title" size="small">
                    Resultados de la simulación
                  </Text>
                  <Stack direction="column" gap="s150">
                    <BoxAttribute
                      label="Cuota mensual:"
                      value={`${currencyFormat(simulatedCredit.quota)}`}
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
                      value={`${currencyFormat(simulatedCredit.cycleInterest)}`}
                    />
                    <BoxAttribute
                      label="Valor neto a recibir:"
                      value={`${currencyFormat(simulatedCredit.netValue)}`}
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

export { SimulationFormUI };
