import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Grid, Select, Stack } from "@inubekit/inubekit";
import { IFormField } from "@ptypes/forms.types";
import { FormikProps } from "formik";
import { generateFormFields, isInvalid } from "src/utils/forms/forms";
import { IDisbursementEntry } from "./types";

interface DisbursementFormUIProps {
  formik: FormikProps<IDisbursementEntry>;
  loading?: boolean;
  customHandleChange: (name: string, value: string) => void;
  renderFields: IFormField[];
}

function DisbursementFormUI(props: DisbursementFormUIProps) {
  const { formik, loading, customHandleChange, renderFields } = props;

  const isTablet = useMediaQuery("(max-width: 1100px)");

  return (
    <form>
      <Stack direction="column" gap={inube.spacing.s300}>
        <Grid
          templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
          autoRows="auto"
          gap={inube.spacing.s300}
          width="100%"
        >
          <Select
            name="disbursement"
            id="disbursement"
            label="Forma de desembolso"
            value={formik.values.disbursement || ""}
            size="compact"
            disabled={formik.values.disbursements.length === 1 || loading}
            options={formik.values.disbursements}
            onChange={customHandleChange}
            onBlur={formik.handleBlur}
            invalid={isInvalid(formik, "disbursement")}
            message={formik.errors.disbursement}
            fullwidth
            placeholder="Selecciona una forma de desembolso"
          />

          {generateFormFields(
            renderFields,
            formik,
            formik.handleBlur,
            customHandleChange,
            isTablet,
            loading,
          )}
        </Grid>
      </Stack>
    </form>
  );
}

export { DisbursementFormUI };
