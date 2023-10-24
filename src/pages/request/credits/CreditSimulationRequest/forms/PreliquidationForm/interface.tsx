import { Fieldset } from "@design/input/Fieldset";
import { TextField } from "@design/input/TextField";
import { Divider } from "@design/layout/Divider";
import { Stack } from "@design/layout/Stack";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { FormikValues } from "formik";
import { MdAdd, MdDragHandle, MdRemove } from "react-icons/md";
import { currencyFormat } from "src/utils/formats";

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
            name="interestAdjustmentCycle"
            id="interestAdjustmentCycle"
            value={currencyFormat(formik.values.interestAdjustmentCycle)}
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

          <Divider dashed />
          <TextField
            label="Valor neto a girar"
            placeholder="Valor neto a girar"
            name="netValue"
            id="netValue"
            value={currencyFormat(formik.values.netValue)}
            iconBefore={<MdDragHandle />}
            isDisabled={loading}
            size="compact"
            isFullWidth
            readOnly
          />
        </Stack>
      </Fieldset>
    </form>
  );
}

export { PreliquidationFormUI };
