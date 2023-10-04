import { Select } from "@design/input/Select";
import { TextField } from "@design/input/TextField";
import { Grid } from "@design/layout/Grid";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { FormikValues } from "formik";
import { MdOutlineModeEdit } from "react-icons/md";
import { getDomainById } from "@mocks/domains/domainService.mocks";

interface BankTransfersFormUIProps {
  formik: FormikValues;
  loading?: boolean;
}

function BankTransfersFormUI(props: BankTransfersFormUIProps) {
  const { formik, loading } = props;

  function stateValue(attribute: string) {
    if (!formik.touched[attribute]) return "pending";
    if (formik.touched[attribute] && formik.errors[attribute]) return "invalid";
    return "valid";
  }

  const isMobile = useMediaQuery("(max-width: 750px)");
  const isTablet = useMediaQuery("(max-width: 1100px)");

  return (
    <form>
      <Grid
        templateColumns={
          isMobile ? "1fr" : isTablet ? "1fr 1fr" : "1fr 1fr 1fr"
        }
        gap={isMobile ? "s150" : isTablet ? "s200" : "s300"}
      >
        <Select
          label="Entidad bancaria"
          name="bankingEntity"
          id="bankingEntity"
          value={formik.values.bankingEntity}
          size="compact"
          isFullWidth
          options={getDomainById("bank")}
          handleBlur={formik.handleBlur}
          isDisabled={loading}
          state={stateValue("bankingEntity")}
          handleChange={formik.handleChange}
        />
        <Select
          label="Tipo de cuenta"
          name="accountType"
          id="accountType"
          value={formik.values.accountType}
          size="compact"
          isFullWidth
          options={getDomainById("accountType")}
          handleBlur={formik.handleBlur}
          isDisabled={loading}
          state={stateValue("accountType")}
          handleChange={formik.handleChange}
        />

        <TextField
          label="Numero de cuenta"
          placeholder="Numero de cuenta"
          name="accountNumber"
          id="accountNumber"
          value={formik.values.accountNumber}
          iconAfter={<MdOutlineModeEdit size={18} />}
          errorMessage={formik.errors.accountNumber}
          isDisabled={loading}
          size="compact"
          isFullWidth
          state={stateValue("accountNumber")}
          handleBlur={formik.handleBlur}
          handleChange={formik.handleChange}
          validMessage="El numero de cuenta es válido"
        />
      </Grid>
    </form>
  );
}

export { BankTransfersFormUI };
