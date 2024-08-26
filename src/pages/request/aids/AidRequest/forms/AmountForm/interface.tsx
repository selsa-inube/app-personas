import { TextField } from "@design/input/TextField";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Grid } from "@inubekit/grid";
import { FormikProps } from "formik";
import { MdAttachMoney } from "react-icons/md";
import {
  handleChangeWithCurrency,
  validateCurrencyField,
} from "src/utils/currency";
import { getFieldState } from "src/utils/forms/forms";
import { IAmountEntry } from "./types";

interface AmountFormUIProps {
  formik: FormikProps<IAmountEntry>;
}

function AmountFormUI(props: AmountFormUIProps) {
  const { formik } = props;

  const isMobile = useMediaQuery("(max-width: 580px)");

  return (
    <form>
      <Grid
        templateColumns={`repeat(${isMobile ? 1 : 3}, 1fr)`}
        autoRows="auto"
        gap={inube.spacing.s300}
      >
        <TextField
          label="Cupo disponible"
          name="quotaAvailable"
          id="quotaAvailable"
          placeholder="Ingresa el valor del auxilio"
          value={validateCurrencyField("quotaAvailable", formik) || ""}
          type="text"
          size="compact"
          isFullWidth
          readOnly
          iconAfter={<MdAttachMoney size={18} />}
        />

        <TextField
          label="Valor de la solicitud"
          name="applicationValue"
          id="applicationValue"
          placeholder="Digite el valor comercial estimado"
          value={validateCurrencyField("applicationValue", formik, false)}
          type="text"
          errorMessage={formik.errors.applicationValue}
          size="compact"
          isFullWidth
          state={getFieldState(formik, "applicationValue")}
          onBlur={formik.handleBlur}
          onChange={(e) => handleChangeWithCurrency(formik, e)}
          validMessage="El valor de la solicitud es válido"
          isRequired
          iconAfter={<MdAttachMoney size={18} />}
        />
      </Grid>
    </form>
  );
}

export { AmountFormUI };
