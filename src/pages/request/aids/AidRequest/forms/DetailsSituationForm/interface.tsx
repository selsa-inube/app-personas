import { Textarea } from "@design/input/Textarea";
import { TextField } from "@design/input/TextField";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Grid } from "@inubekit/grid";
import { Stack } from "@inubekit/stack";
import { FormikProps } from "formik";
import { MdAttachMoney } from "react-icons/md";
import {
  handleChangeWithCurrency,
  validateCurrencyField,
} from "src/utils/currency";
import { getFieldState } from "src/utils/forms/forms";
import { IDetailsSituationEntry } from "./types";

interface DetailsSituationFormUIProps {
  formik: FormikProps<IDetailsSituationEntry>;
}

function DetailsSituationFormUI(props: DetailsSituationFormUIProps) {
  const { formik } = props;

  const isMobile = useMediaQuery("(max-width: 700px)");

  return (
    <form>
      <Stack direction="column" gap={inube.spacing.s300}>
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

        <Textarea
          id="message"
          name="message"
          label="Detalles adicionales"
          placeholder="Escribe los detalles que debemos tener en cuenta"
          maxLength={120}
          value={formik.values.message}
          errorMessage={formik.errors.message}
          state={getFieldState(formik, "message")}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          withCounter
          isFullWidth
        />
      </Stack>
    </form>
  );
}

export { DetailsSituationFormUI };
