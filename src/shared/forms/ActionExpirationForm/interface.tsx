import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Grid, Select } from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { isInvalid } from "src/utils/forms/forms";
import { IActionExpirationEntry } from "./types";

interface ActionExpirationFormUIProps {
  formik: FormikProps<IActionExpirationEntry>;
  loading?: boolean;
  customHandleChange: (name: string, value: string) => void;
}

function ActionExpirationFormUI(props: ActionExpirationFormUIProps) {
  const { formik, loading, customHandleChange } = props;

  const isTablet = useMediaQuery("(max-width: 1200px)");

  return (
    <form>
      <Grid
        templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
        gap={inube.spacing.s300}
      >
        <Select
          name="actionExpiration"
          id="actionExpiration"
          label="Renovar producto al vencimiento"
          value={formik.values.actionExpiration || ""}
          size="compact"
          disabled={formik.values.actionsExpiration?.length === 1 || loading}
          options={formik.values.actionsExpiration || []}
          onChange={customHandleChange}
          onBlur={formik.handleBlur}
          invalid={isInvalid(formik, "actionExpiration")}
          message={formik.errors.actionExpiration}
          fullwidth
        />
      </Grid>
    </form>
  );
}

export { ActionExpirationFormUI };
