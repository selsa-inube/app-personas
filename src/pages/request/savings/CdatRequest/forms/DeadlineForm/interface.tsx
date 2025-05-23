import { BoxAttribute } from "@components/cards/BoxAttribute";
import { Table } from "@design/data/Table";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import {
  Button,
  Date,
  Divider,
  Fieldset,
  Grid,
  Numberfield,
  Stack,
  Text,
} from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { currencyFormat } from "src/utils/currency";
import { getFieldState } from "src/utils/forms/forms";
import { currentIntRateTableTitles, mapRateTermsEntries } from "./config/table";
import { StyledInputRadio } from "./styles";
import { IDeadlineEntry } from "./types";

interface DeadlineFormUIProps {
  formik: FormikProps<IDeadlineEntry>;
  loading?: boolean;
  loadingSimulation?: boolean;
  simulateCDAT: () => void;
  customHandleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
}

function DeadlineFormUI(props: DeadlineFormUIProps) {
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
            legend="Simulador"
            type={isMobile ? "label" : "title"}
            size={isMobile ? "medium" : "small"}
          >
            <Stack direction="column" gap={inube.spacing.s250} width="100%">
              <Text type="body" size="medium" appearance="gray">
                Selecciona una de las opciones para simular tu CDAT por fecha o
                por numero de días.
              </Text>

              <Grid
                gap={inube.spacing.s300}
                templateColumns={`repeat(${isMobile ? 1 : 2}, 1fr)`}
                autoRows="auto"
              >
                <Stack
                  direction="row"
                  alignItems="flex-end"
                  gap={inube.spacing.s100}
                >
                  <StyledInputRadio
                    id="simulationWithDate"
                    name="simulationWithDate"
                    type="radio"
                    checked={formik.values.simulationWithDate}
                    disabled
                    onChange={customHandleChange}
                  />

                  <Date
                    label="Fecha"
                    name="deadlineDate"
                    id="deadlineDate"
                    value={formik.values.deadlineDate || ""}
                    message={formik.errors.deadlineDate}
                    onBlur={formik.handleBlur}
                    onChange={customHandleChange}
                    fullwidth
                    disabled
                  />
                </Stack>

                <Stack
                  direction="row"
                  alignItems="flex-end"
                  gap={inube.spacing.s100}
                >
                  <StyledInputRadio
                    id="simulationWithDays"
                    name="simulationWithDays"
                    type="radio"
                    checked={formik.values.simulationWithDays}
                    onChange={customHandleChange}
                  />

                  <Numberfield
                    label="Plazo en número de días"
                    placeholder="Digite la cantidad de días"
                    name="deadlineDays"
                    id="deadlineDays"
                    value={formik.values.deadlineDays || ""}
                    message={formik.errors.deadlineDays}
                    disabled={loading}
                    size="compact"
                    fullwidth
                    status={getFieldState(formik, "deadlineDays")}
                    onBlur={formik.handleBlur}
                    onChange={customHandleChange}
                  />
                </Stack>
              </Grid>

              <Stack direction="column" gap={inube.spacing.s250}>
                <Stack width="100%" justifyContent="flex-end">
                  <Button
                    variant="outlined"
                    spacing="compact"
                    onClick={simulateCDAT}
                    loading={loadingSimulation}
                    disabled={
                      !!formik.errors.deadlineDate ||
                      !!formik.errors.deadlineDays ||
                      (formik.values.simulationWithDate &&
                        !formik.values.deadlineDate) ||
                      (formik.values.simulationWithDays &&
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
                      gap={inube.spacing.s200}
                      templateColumns={`repeat(${isMobile ? 1 : 3}, 1fr)`}
                      autoRows="auto"
                    >
                      <BoxAttribute
                        label="Tasa efectiva anual:"
                        value={`${formik.values.effectiveAnnualRate} %`}
                      />

                      <BoxAttribute
                        label="Plazo en número de días:"
                        value={`${formik.values.deadlineDays}`}
                      />

                      <BoxAttribute
                        label="Intereses totales:"
                        value={`${currencyFormat(
                          formik.values.totalInterest || 0,
                        )}`}
                      />

                      <BoxAttribute
                        label="Retención en la fuente:"
                        value={`${currencyFormat(
                          formik.values.withholdingTax || 0,
                        )}`}
                      />
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
          <Text type="title" size="small" weight="bold">
            Tasas de interés vigentes
          </Text>
          <Stack direction="row" gap={inube.spacing.s100}>
            <Text type="body" size={isMobile ? "small" : "medium"}>
              Los tasas mostradas aplican para una inversión por valor de:
            </Text>
            <Text
              type="body"
              size={isMobile ? "small" : "medium"}
              weight="bold"
            >
              {currencyFormat(formik.values.investmentValue || 0)}
            </Text>
          </Stack>
          <Table
            portalId="modals"
            titles={currentIntRateTableTitles}
            entries={mapRateTermsEntries(formik.values.rateTerms)}
            hideMobileResume
          />
        </Stack>
      </Stack>
    </form>
  );
}

export { DeadlineFormUI };
