import { Table } from "@design/data/Table";
import { Text } from "@design/data/Text";
import { Switch } from "@design/input/Switch";
import { TextField } from "@design/input/TextField";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { programmedSavingsRatesMocks } from "@mocks/products/savings/programmedSavingsRates.mocks";
import { FormikValues } from "formik";
import { getFieldState } from "src/utils/forms/forms";
import { goalRatesTableTitles } from "./config/table";

interface GoalFormUIProps {
  formik: FormikValues;
  loading?: boolean;
  customHandleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
}

function GoalFormUI(props: GoalFormUIProps) {
  const { formik, loading, customHandleChange } = props;

  const isTablet = useMediaQuery("(max-width: 750px)");

  return (
    <form>
      <Stack direction="column" gap="s400">
        <Stack direction="column" gap="s200" alignItems="flex-start">
          <Switch
            label="Prefiero ingresar la fecha"
            id="goalWithDate"
            name="goalWithDate"
            onChange={customHandleChange}
            checked={formik.values.goalWithDate}
            margin="0"
            padding={`${inube.spacing.s050} ${inube.spacing.s200}`}
            size="large"
          />

          <Grid
            gap="s300"
            templateColumns={isTablet ? "1fr" : "1fr 1fr"}
            width="100%"
          >
            <TextField
              label="Reembolso en número de días"
              placeholder={
                !formik.values.goalWithDate ? "Digita la cantidad de dias" : ""
              }
              name="daysNumber"
              id="daysNumber"
              value={formik.values.daysNumber}
              type="number"
              errorMessage={formik.errors.daysNumber}
              isDisabled={loading}
              readOnly={formik.values.goalWithDate}
              size="compact"
              isFullWidth
              state={getFieldState(formik, "daysNumber")}
              onBlur={formik.handleBlur}
              onChange={customHandleChange}
              validMessage="El número de días es válido"
              isRequired
            />

            <TextField
              label="Reembolso en fecha"
              placeholder={
                formik.values.goalWithDate ? "Ejemplo: 01/Ene/1990" : ""
              }
              name="refundDate"
              id="refundDate"
              value={formik.values.refundDate}
              type="text"
              errorMessage={formik.errors.refundDate}
              isDisabled={loading}
              readOnly={!formik.values.goalWithDate}
              size="compact"
              isFullWidth
              state={getFieldState(formik, "refundDate")}
              onBlur={formik.handleBlur}
              onChange={customHandleChange}
              validMessage="La fecha de reembolso es valida"
              isRequired
            />
          </Grid>
        </Stack>

        <Stack direction="column" gap="s100" alignItems="flex-start">
          <Text type="title" size="small">
            Tasas de interés vigentes
          </Text>
          <Table
            titles={goalRatesTableTitles}
            entries={programmedSavingsRatesMocks}
            hideMobileResume
          />
        </Stack>
      </Stack>
    </form>
  );
}

export { GoalFormUI };
