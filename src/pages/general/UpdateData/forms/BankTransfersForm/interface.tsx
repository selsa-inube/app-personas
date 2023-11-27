import { Select } from "@design/input/Select";
import { TextField } from "@design/input/TextField";
import { Grid } from "@design/layout/Grid";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { getDomainById } from "@mocks/domains/domainService.mocks";
import { FormikValues } from "formik";
import { MdOutlineModeEdit } from "react-icons/md";

interface BankTransfersFormUIProps {
  formik: FormikValues;
  loading?: boolean;
  customHandleBlur: (event: React.FocusEvent<HTMLElement, Element>) => void;
}

function BankTransfersFormUI(props: BankTransfersFormUIProps) {
  const { formik, loading, customHandleBlur } = props;

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
          name="bankEntity"
          id="bankEntity"
          value={formik.values.bankEntity}
          size="compact"
          isFullWidth
          options={getDomainById("bank")}
          onBlur={customHandleBlur}
          isDisabled={loading}
          state={stateValue("bankEntity")}
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
          onBlur={customHandleBlur}
          isDisabled={loading}
          state={stateValue("accountType")}
          onChange={formik.handleChange}
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
          onBlur={customHandleBlur}
          onChange={formik.handleChange}
          validMessage="El numero de cuenta es válido"
        />
      </Grid>
    </form>
  );
}

export { BankTransfersFormUI };
