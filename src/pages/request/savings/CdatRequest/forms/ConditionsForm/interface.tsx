import { BoxAttribute } from "@components/cards/BoxAttribute";
import { Table } from "@design/data/Table";
import { Button } from "@design/input/Button";
import { DateField } from "@design/input/DateField";
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
import { investmentsRatesMocks } from "@mocks/products/investments/investmentsRates.mocks";
import { FormikProps } from "formik";
import { periodicityDM } from "src/model/domains/general/periodicityDM";
import { currencyFormat, validateCurrencyField } from "src/utils/currency";
import { getFieldState } from "src/utils/forms/forms";
import { currentIntRateTableTitles } from "./config/table";
import { IConditionsEntry } from "./types";

interface ConditionsFormUIProps {
  formik: FormikProps<IConditionsEntry>;
  loading?: boolean;
  loadingSimulation?: boolean;
  simulateCDAT: () => void;
  customHandleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
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
      <Stack
        direction="column"
        gap={isMobile ? inube.spacing.s200 : inube.spacing.s300}
      >
        <Stack direction="column" gap={inube.spacing.s200}>
          <Fieldset
            title="Simulador"
            type={isMobile ? "label" : "title"}
            size={isMobile ? "medium" : "small"}
          >
            <Stack direction="column" gap={inube.spacing.s300}>
              <Grid
                gap={inube.spacing.s300}
                templateColumns={`repeat(${isMobile ? 1 : 3}, 1fr)`}
                autoRows="auto"
              >
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
                  options={periodicityDM.options}
                  onBlur={formik.handleBlur}
                  errorMessage={formik.errors.interestPayment}
                  isDisabled={loading}
                  state={getFieldState(formik, "interestPayment")}
                  onChange={customHandleChange}
                  isRequired
                />

                {formik.values.simulationWithDate ? (
                  <DateField
                    label="Fecha"
                    name="deadlineDate"
                    id="deadlineDate"
                    value={formik.values.deadlineDate}
                    errorMessage={formik.errors.deadlineDate}
                    state={getFieldState(formik, "deadlineDate")}
                    onBlur={formik.handleBlur}
                    onChange={customHandleChange}
                    isRequired
                    isFullWidth
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

              <Stack direction="column" gap={inube.spacing.s250}>
                <Stack
                  padding={
                    isMobile
                      ? inube.spacing.s0
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

                <Stack width="100%" justifyContent="flex-end">
                  <Button
                    variant="outlined"
                    spacing="compact"
                    onClick={simulateCDAT}
                    load={loadingSimulation}
                    disabled={
                      !formik.values.interestPayment ||
                      (!formik.values.deadlineDays &&
                        !formik.values.deadlineDate) ||
                      (formik.errors.deadlineDays &&
                        !formik.values.deadlineDate) ||
                      (formik.errors.deadlineDate &&
                        !formik.values.deadlineDays) ||
                      false
                    }
                  >
                    Simular
                  </Button>
                </Stack>
              </Stack>
              {formik.values.hasResult && (
                <>
                  <Divider dashed />

                  <Stack direction="column" gap={inube.spacing.s300}>
                    <Text type="title" size="small">
                      Resultados de la simulación
                    </Text>
                    <Grid
                      gap={inube.spacing.s300}
                      templateColumns={`repeat(${isMobile ? 1 : 2}, 1fr)`}
                      autoRows="auto"
                    >
                      <Stack direction="column" gap={inube.spacing.s150}>
                        <BoxAttribute
                          label="Tasa efectiva anual:"
                          value={`${formik.values.effectiveAnnualRate} %`}
                        />
                        <BoxAttribute
                          label="Intereses totales:"
                          value={`${currencyFormat(
                            formik.values.totalInterest || 0,
                          )}`}
                        />
                      </Stack>

                      <Stack direction="column" gap={inube.spacing.s150}>
                        <BoxAttribute
                          label="Plazo en número de días:"
                          value={`${formik.values.deadlineDays}`}
                        />
                        <BoxAttribute
                          label="Retención en la fuente:"
                          value={`${currencyFormat(
                            formik.values.withholdingTax || 0,
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

        <Stack
          direction="column"
          gap={inube.spacing.s100}
          alignItems="flex-start"
        >
          <Text type="title" size="small">
            Tasas de interés vigentes
          </Text>
          <Text type="body" size={isMobile ? "small" : "medium"}>
            Los tasas mostradas aplican para una inversión por valor de:
            {`  ${currencyFormat(formik.values.valueInvestment || 0)}`}
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
