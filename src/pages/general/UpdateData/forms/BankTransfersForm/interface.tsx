import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Button, Grid, Numberfield, Select, Stack } from "@inubekit/inubekit";
import { getDomainById } from "@mocks/domains/domainService.mocks";
import { FormikProps } from "formik";
import {
  formikHandleChange,
  getFieldState,
  isInvalid,
} from "src/utils/forms/forms";
import { IBankTransfersEntry } from "./types";

interface BankTransfersFormUIProps {
  formik: FormikProps<IBankTransfersEntry>;
  loading?: boolean;
  withSubmit?: boolean;
}

function BankTransfersFormUI(props: BankTransfersFormUIProps) {
  const { formik, loading, withSubmit } = props;

  const isMobile = useMediaQuery("(max-width: 700px)");
  const isTablet = useMediaQuery("(max-width: 1100px)");

  return (
    <form>
      <Stack direction="column" alignItems="flex-end" gap={inube.spacing.s300}>
        <Grid
          templateColumns={`repeat(${isTablet ? 1 : 3}, 1fr)`}
          autoRows="auto"
          gap={isMobile ? inube.spacing.s150 : inube.spacing.s300}
          width="100%"
        >
          <Select
            label="Entidad bancaria"
            name="bankEntity"
            id="bankEntity"
            value={formik.values.bankEntityName}
            size="compact"
            fullwidth
            options={getDomainById("bank")}
            onBlur={formik.handleBlur}
            disabled={loading}
            invalid={isInvalid(formik, "bankEntity")}
            onChange={(name, value) => formikHandleChange(name, value, formik)}
          />
          <Select
            label="Tipo de cuenta"
            name="accountType"
            id="accountType"
            value={formik.values.accountType}
            size="compact"
            fullwidth
            options={getDomainById("accountType")}
            onBlur={formik.handleBlur}
            disabled={loading}
            invalid={isInvalid(formik, "accountType")}
            onChange={(name, value) => formikHandleChange(name, value, formik)}
          />

          <Numberfield
            label="Numero de cuenta"
            placeholder="Numero de cuenta"
            name="accountNumber"
            id="accountNumber"
            value={formik.values.accountNumber}
            message={formik.errors.accountNumber}
            disabled={loading}
            size="compact"
            fullwidth
            status={getFieldState(formik, "accountNumber")}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </Grid>

        {withSubmit && (
          <Stack gap={inube.spacing.s150} justifyContent="flex-end">
            <Button
              onClick={() => formik.handleReset()}
              type="button"
              disabled={loading || !formik.dirty}
              spacing="compact"
              variant="outlined"
              appearance="gray"
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              spacing="compact"
              disabled={loading || !formik.dirty || !formik.isValid}
            >
              Guardar
            </Button>
          </Stack>
        )}
      </Stack>
    </form>
  );
}

export { BankTransfersFormUI };
