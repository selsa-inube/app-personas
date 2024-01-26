import { Select } from "@design/input/Select";
import { TextField } from "@design/input/TextField";
import { Grid } from "@design/layout/Grid";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { getDomainById } from "@mocks/domains/domainService.mocks";
import { FormikValues } from "formik";
import { MdOutlineModeEdit } from "react-icons/md";
import { getFieldState } from "src/utils/forms/forms";

interface BankTransfersFormUIProps {
  formik: FormikValues;
  loading?: boolean;
}

function BankTransfersFormUI(props: BankTransfersFormUIProps) {
  const { formik, loading } = props;

  const isMobile = useMediaQuery("(max-width: 700px)");
  const isTablet = useMediaQuery("(max-width: 1100px)");

  return (
    <form>
      <Grid
        templateColumns={isTablet ? "1fr" : "1fr 1fr 1fr"}
        gap={isMobile ? "s150" : "s300"}
      >
        <Select
          label="Entidad bancaria"
          name="bankEntity"
          id="bankEntity"
          value={formik.values.bankEntity}
          size="compact"
          isFullWidth
          options={getDomainById("bank")}
          onBlur={formik.handleBlur}
          isDisabled={loading}
          state={getFieldState(formik, "bankEntity")}
          onChange={formik.handleChange}
        />
        <Select
          label="Tipo de cuenta"
          name="accountType"
          id="accountType"
          value={formik.values.accountType}
          size="compact"
          isFullWidth
          options={getDomainById("accountType")}
          onBlur={formik.handleBlur}
          isDisabled={loading}
          state={getFieldState(formik, "accountType")}
          onChange={formik.handleChange}
        />

        <TextField
          label="Numero de cuenta"
          placeholder="Numero de cuenta"
          name="accountNumber"
          id="accountNumber"
          type="number"
          value={formik.values.accountNumber}
          iconAfter={<MdOutlineModeEdit size={18} />}
          errorMessage={formik.errors.accountNumber}
          isDisabled={loading}
          size="compact"
          isFullWidth
          state={getFieldState(formik, "accountNumber")}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          validMessage="El numero de cuenta es válido"
        />
      </Grid>
    </form>
  );
}

export { BankTransfersFormUI };
