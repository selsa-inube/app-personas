import { Select } from "@design/input/Select";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Grid } from "@inubekit/grid";
import { FormikProps } from "formik";
import { getFieldState } from "src/utils/forms/forms";
import { IActionExpirationEntry } from "./types";

interface ActionExpirationFormUIProps {
  formik: FormikProps<IActionExpirationEntry>;
  loading?: boolean;
  customHandleChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
}

function ActionExpirationFormUI(props: ActionExpirationFormUIProps) {
  const { formik, loading, customHandleChange } = props;

  const isMobile = useMediaQuery("(max-width: 700px)");
  const isTablet = useMediaQuery("(max-width: 1200px)");

  return (
    <form>
      <Grid
        templateColumns={`repeat(${isMobile ? 1 : isTablet ? 2 : 3}, 1fr)`}
        gap={inube.spacing.s300}
      >
        <Select
          name="actionExpiration"
          id="actionExpiration"
          label="Renovar producto al vencimiento"
          value={formik.values.actionExpiration || ""}
          size="compact"
          isDisabled={loading}
          options={formik.values.actionsExpiration || []}
          onChange={customHandleChange}
          onBlur={formik.handleBlur}
          state={getFieldState(formik, "actionExpiration")}
          errorMessage={formik.errors.actionExpiration}
          isFullWidth
          readOnly={formik.values.actionsExpiration?.length === 1}
        />
      </Grid>
    </form>
  );
}

export { ActionExpirationFormUI };
