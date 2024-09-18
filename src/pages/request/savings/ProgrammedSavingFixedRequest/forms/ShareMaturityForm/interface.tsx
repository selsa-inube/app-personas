import { Select } from "@design/input/Select";
import { inube } from "@design/tokens";
import { Grid } from "@inubekit/grid";
import { FormikProps } from "formik";
import { shareMaturityDM } from "src/model/domains/savings/shareMaturityDM";
import { getFieldState } from "src/utils/forms/forms";
import { IShareMaturityEntry } from "./types";

interface ShareMaturityFormUIProps {
  formik: FormikProps<IShareMaturityEntry>;
  loading?: boolean;
  customHandleChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
}

function ShareMaturityFormUI(props: ShareMaturityFormUIProps) {
  const { formik, loading, customHandleChange } = props;

  return (
    <form>
      <Grid templateColumns="repeat(3, 1fr)" gap={inube.spacing.s300}>
        <Select
          name="action"
          id="action"
          label="Acción al vencimiento"
          value={formik.values.action || ""}
          size="compact"
          isDisabled={loading}
          options={shareMaturityDM.options}
          onChange={customHandleChange}
          onBlur={formik.handleBlur}
          state={getFieldState(formik, "action")}
          errorMessage={formik.errors.action}
          isFullWidth
        />
      </Grid>
    </form>
  );
}

export { ShareMaturityFormUI };
