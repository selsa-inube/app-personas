import { Select } from "@design/input/Select";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Grid } from "@inubekit/grid";
import { Stack } from "@inubekit/stack";
import { IFormField } from "@ptypes/forms.types";
import { FormikProps } from "formik";
import { generateFormFields, getFieldState } from "src/utils/forms/forms";
import { IDisbursementEntry } from "./types";

interface DisbursementFormUIProps {
  formik: FormikProps<IDisbursementEntry>;
  loading?: boolean;
  customHandleChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  renderFields: IFormField[];
}

function DisbursementFormUI(props: DisbursementFormUIProps) {
  const { formik, loading, customHandleChange, renderFields } = props;

  const isTablet = useMediaQuery("(max-width: 900px)");

  return (
    <form>
      <Stack direction="column" gap={inube.spacing.s300}>
        <Select
          name="disbursementType"
          id="disbursementType"
          label="Forma de desembolso"
          value={formik.values.disbursementType}
          size="compact"
          isDisabled={loading}
          options={formik.values.disbursements}
          onChange={customHandleChange}
          onBlur={formik.handleBlur}
          state={getFieldState(formik, "disbursementType")}
          errorMessage={formik.errors.disbursementType}
          isFullWidth
        />
        <Grid
          templateColumns="repeat(2, 1fr)"
          autoRows="auto"
          gap={inube.spacing.s300}
        >
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
