import { FormikValues } from "formik";
import { Fieldset } from "@design/input/Fieldset";
import { TextField } from "@design/input/TextField";
import { Stack } from "@design/layout/Stack";
import { currencyFormat } from "src/utils/formats";
import { MdAdd, MdRemove } from "react-icons/md";
import { Text } from "@design/data/Text";
import { useMediaQuery } from "@hooks/useMediaQuery";

interface PreliquidationFormUIProps {
  formik: FormikValues;
  loading?: boolean;
}

function PreliquidationFormUI(props: PreliquidationFormUIProps) {
  const { formik, loading } = props;

  const isMobile = useMediaQuery("(max-width: 560px)");

  return (
    <form>
      <Fieldset title="Detalles de amortización">
        <Stack direction="column" gap={isMobile ? "s250" : "s300"}>
          <Stack direction="column" gap={isMobile ? "s200" : "s250"}>
            <TextField
              label="Monto"
              placeholder="Monto"
              name="amount"
              id="amount"
              value={currencyFormat(formik.values.amount)}
              iconBefore={<MdAdd />}
              isDisabled={loading}
              size="compact"
              isFullWidth
              readOnly
            />
            <TextField
              label="Intereses anticipados de ajuste al ciclo"
              placeholder="Intereses anticipados de ajuste al ciclo"
              name="advanceInterestAdjustmentCycle"
              id="advanceInterestAdjustmentCycle"
              value={currencyFormat(
                formik.values.advanceInterestAdjustmentCycle
              )}
              iconBefore={<MdRemove />}
              isDisabled={loading}
              size="compact"
              isFullWidth
              readOnly
            />
            <TextField
              label="Cargos y descuentos"
              placeholder="Cargos y descuentos"
              name="chargesAndDiscounts"
              id="chargesAndDiscounts"
              value={currencyFormat(formik.values.chargesAndDiscounts)}
              iconBefore={<MdRemove />}
              isDisabled={loading}
              size="compact"
              isFullWidth
              readOnly
            />
          </Stack>
          <Stack
            gap="s100"
            justifyContent={isMobile ? "space-between" : "flex-end"}
          >
            <Text type="label" size="large" appearance="gray">
              Valor neto a girar:
            </Text>
            <Text type="title" size="small">
              {currencyFormat(formik.values.netValueToSend)}
            </Text>
          </Stack>
        </Stack>
      </Fieldset>
    </form>
  );
}

export { PreliquidationFormUI };
