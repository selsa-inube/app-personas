import { BoxAttribute } from "@components/cards/BoxAttribute";
import { Table } from "@design/data/Table";
import { Text } from "@design/data/Text";
import { Button } from "@design/input/Button";
import { Fieldset } from "@design/input/Fieldset";
import { Select } from "@design/input/Select";
import { Switch } from "@design/input/Switch";
import { TextField } from "@design/input/TextField";
import { Grid } from "@design/layout/Grid";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { investmentsRatesMocks } from "@mocks/products/investments/investmentsRates.mocks";
import { FormikValues } from "formik";
import { peridiocityDM } from "src/model/domains/general/peridiocityDM";
import { currencyFormat, validateCurrencyField } from "src/utils/currency";
import { getFieldState } from "src/utils/forms/forms";
import { currentIntRateTableTitles } from "./config/table";
import { Divider } from "@inubekit/divider";
import { Stack } from "@inubekit/stack";

interface ConditionsFormUIProps {
  formik: FormikValues;
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

                  <Stack direction="column" gap={inube.spacing.s300}>
                    <Text type="title" size="small">
                      Resultados de la simulación
                    </Text>
                    <Grid
                      gap="s300"
                      templateColumns={isMobile ? "1fr" : "1fr 1fr"}
                    >
                      <Stack direction="column" gap={inube.spacing.s150}>
                        <BoxAttribute
                          label="Tasa efectiva anual:"
                          value={`${formik.values.effectiveAnnualRate} %`}
                        />
                        <BoxAttribute
                          label="Intereses totales:"
                          value={`${currencyFormat(
                            formik.values.totalInterest,
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
                            formik.values.withholdingTax,
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

        <Stack direction="column" gap={inube.spacing.s100} alignItems="flex-start">
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
