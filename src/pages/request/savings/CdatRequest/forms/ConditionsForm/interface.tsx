import { TextField } from "@design/input/TextField";
import { Stack } from "@design/layout/Stack";
import { Fieldset } from "@design/input/Fieldset";
import { Grid } from "@design/layout/Grid";
import { Switch } from "@design/input/Switch";
import { Button } from "@design/input/Button";
import { inube } from "@design/tokens";
import { Select } from "@design/input/Select";
import { BoxAttribute } from "@components/cards/BoxAttribute";
import { Text } from "@design/data/Text";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { peridiocityDM } from "src/model/domains/general/peridiocity";
import { FormikValues } from "formik";
import { currencyFormat, validateCurrencyField } from "src/utils/currency";
import { Divider } from "@design/layout/Divider";
import { Table } from "@design/data/Table";
import { currentIntRateTableTitles } from "./config/table";
import { investmentsRatesMocks } from "@mocks/products/investments/investmentsRates.mocks";
import { getFieldState } from "src/utils/forms/forms";

interface ConditionsFormUIProps {
  formik: FormikValues;
  loading?: boolean;
  loadingSimulation?: boolean;
  simulateCDAT: () => void;
  customHandleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
}

function ConditionsFormUI(props: ConditionsFormUIProps) {
  const {
    formik,
    loading,
    loadingSimulation,
    simulateCDAT,
    customHandleChange,
  } = props;

  const isMobile = useMediaQuery("(max-width: 550px)");

  return (
    <form>
      <Stack direction="column" gap={isMobile ? "s200" : "s300"}>
        <Stack direction="column" gap="s200">
          <Fieldset
            title="Simulador"
            type={isMobile ? "label" : "title"}
            size={isMobile ? "medium" : "small"}
          >
            <Stack direction="column" gap="s300">
              <Grid gap="s300" templateColumns={isMobile ? "1fr" : "1fr 1fr"}>
                <TextField
                  label="Valor de la inversión"
                  placeholder=""
                  name="valueInvestment"
                  id="valueInvestment"
                  value={validateCurrencyField("valueInvestment", formik)}
                  isDisabled={loading}
                  size="compact"
                  isFullWidth
                  readOnly
                />

                <Select
                  label="Pago de intereses"
                  name="interestPayment"
                  id="interestPayment"
                  value={formik.values.interestPayment}
                  size="compact"
                  isFullWidth
                  options={peridiocityDM.options}
                  onBlur={formik.handleBlur}
                  errorMessage={formik.errors.interestPayment}
                  isDisabled={loading}
                  state={getFieldState(formik, "interestPayment")}
                  onChange={customHandleChange}
                  isRequired
                />
              </Grid>

              <Stack direction="column" gap="s250">
                <Stack
                  padding={
                    isMobile
                      ? "s0"
                      : `${inube.spacing.s050} ${inube.spacing.s200}`
                  }
                >
                  <Switch
                    label="Prefiero ingresar la fecha"
                    id="simulationWithDate"
                    name="simulationWithDate"
                    onChange={customHandleChange}
                    checked={formik.values.simulationWithDate}
                    margin="0"
                    padding="0"
                    size="large"
                  />
                </Stack>
                <Grid gap="s300" templateColumns={isMobile ? "1fr" : "1fr 1fr"}>
                  {formik.values.simulationWithDate ? (
                    <TextField
                      label="Fecha"
                      placeholder="Digita la fecha en formato D/M/A"
                      name="deadlineDate"
                      id="deadlineDate"
                      value={formik.values.deadlineDate}
                      type="text"
                      errorMessage={formik.errors.deadlineDate}
                      isDisabled={loading}
                      size="compact"
                      isFullWidth
                      state={getFieldState(formik, "deadlineDate")}
                      onBlur={formik.handleBlur}
                      onChange={customHandleChange}
                      validMessage="La fecha de expedición es válida"
                    />
                  ) : (
                    <TextField
                      label="Plazo en número de días"
                      placeholder="Digite la cantidad de días"
                      name="deadlineDays"
                      id="deadlineDays"
                      value={formik.values.deadlineDays}
                      type="number"
                      errorMessage={formik.errors.deadlineDays}
                      isDisabled={loading}
                      size="compact"
                      isFullWidth
                      state={getFieldState(formik, "deadlineDays")}
                      onBlur={formik.handleBlur}
                      onChange={customHandleChange}
                      validMessage="El número de días es valido"
                    />
                  )}
                </Grid>
                <Stack width="100%" justifyContent="flex-end">
                  <Button
                    variant="outlined"
                    onClick={simulateCDAT}
                    load={loadingSimulation}
                    disabled={
                      !formik.values.interestPayment ||
                      (!formik.values.deadlineDays &&
                        !formik.values.deadlineDate) ||
                      (formik.errors.deadlineDays &&
                        !formik.values.deadlineDate) ||
                      (formik.errors.deadlineDate && 
                        !formik.values.deadlineDays)
                    }
                  >
                    Simular
                  </Button>
                </Stack>
              </Stack>
              {formik.values.hasResult && (
                <>
                  <Divider dashed />

                  <Stack direction="column" gap="s300">
                    <Text type="title" size="small">
                      Resultados de la simulación
                    </Text>
                    <Grid
                      gap="s300"
                      templateColumns={isMobile ? "1fr" : "1fr 1fr"}
                    >
                      <Stack direction="column" gap="s150">
                        <BoxAttribute
                          label="Tasa efectiva anual:"
                          value={`${formik.values.effectiveAnnualRate} %`}
                        />
                        <BoxAttribute
                          label="Intereses totales:"
                          value={`${currencyFormat(
                            formik.values.totalInterest
                          )}`}
                        />
                      </Stack>

                      <Stack direction="column" gap="s150">
                        <BoxAttribute
                          label="Plazo en número de días:"
                          value={`${formik.values.deadlineDays}`}
                        />
                        <BoxAttribute
                          label="Retención en la fuente:"
                          value={`${currencyFormat(
                            formik.values.withholdingTax
                          )}`}
                        />
                      </Stack>
                    </Grid>
                  </Stack>
                </>
              )}
            </Stack>
          </Fieldset>
        </Stack>

        <Stack direction="column" gap="s100" alignItems="flex-start">
          <Text type="title" size="small">
            Tasas de interés vigentes
          </Text>
          <Text type="body" size={isMobile ? "small" : "medium"}>
            Los tasas mostradas aplican para una inversión por valor de:
            {`  ${currencyFormat(formik.values.valueInvestment)}`}
          </Text>
          <Table
            portalId="modals"
            titles={currentIntRateTableTitles}
            entries={investmentsRatesMocks}
            hideMobileResume
          />
        </Stack>
      </Stack>
    </form>
  );
}

export { ConditionsFormUI };
