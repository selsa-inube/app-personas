import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import {
  Grid,
  Moneyfield,
  Numberfield,
  Stack,
  Textarea,
} from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { MdAttachMoney, MdOutlineTag } from "react-icons/md";
import {
  handleChangeWithCurrency,
  validateCurrencyField,
} from "src/utils/currency";
import { getFieldState, getFieldStatus } from "src/utils/forms/forms";
import { IDetailsSituationEntry } from "./types";

interface DetailsSituationFormUIProps {
  formik: FormikProps<IDetailsSituationEntry>;
  withAmount: boolean;
  withDays: boolean;
}

function DetailsSituationFormUI(props: DetailsSituationFormUIProps) {
  const { formik, withAmount, withDays } = props;

  const isMobile = useMediaQuery("(max-width: 700px)");

  return (
    <form>
      <Stack direction="column" gap={inube.spacing.s300}>
        {withAmount && (
          <Grid
            templateColumns={`repeat(${isMobile ? 1 : 2}, 1fr)`}
            autoRows="auto"
            gap={inube.spacing.s300}
          >
            <Moneyfield
              label="Cupo disponible"
              name="quotaAvailable"
              id="quotaAvailable"
              placeholder="Ingresa el valor del auxilio"
              value={validateCurrencyField("quotaAvailable", formik) || ""}
              type="text"
              size="compact"
              fullwidth
              disabled
              iconAfter={<MdAttachMoney size={18} />}
            />

            <Moneyfield
              label="Valor de la solicitud"
              name="applicationValue"
              id="applicationValue"
              placeholder="Ingresa el valor del auxilio"
              value={validateCurrencyField("applicationValue", formik, false)}
              type="text"
              message={formik.errors.applicationValue}
              size="compact"
              fullwidth
              status={getFieldState(formik, "applicationValue")}
              onBlur={formik.handleBlur}
              onChange={(e) => handleChangeWithCurrency(formik, e)}
              required
              iconAfter={<MdAttachMoney size={18} />}
            />
          </Grid>
        )}

        {withDays && (
          <Grid
            templateColumns={`repeat(${isMobile ? 1 : 2}, 1fr)`}
            autoRows="auto"
            gap={inube.spacing.s300}
          >
            <Numberfield
              label="Días de incapacidad"
              name="applicationDays"
              id="applicationDays"
              placeholder="Digita el numero de días"
              value={formik.values.applicationDays || ""}
              type="number"
              message={formik.errors.applicationDays}
              size="compact"
              fullwidth
              status={getFieldState(formik, "applicationDays")}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              required
              iconAfter={<MdOutlineTag size={18} />}
            />
          </Grid>
        )}

        <Textarea
          id="message"
          name="message"
          label="Detalles adicionales"
          placeholder="Escribe los detalles que debemos tener en cuenta"
          maxLength={120}
          value={formik.values.message}
          message={formik.errors.message}
          status={getFieldStatus(formik, "message")}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          fullwidth
        />
      </Stack>
    </form>
  );
}

export { DetailsSituationFormUI };
