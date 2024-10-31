import { Select } from "@design/input/Select";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
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

  const isMobile = useMediaQuery("(max-width: 700px)");
  const isTablet = useMediaQuery("(max-width: 1200px)");

  return (
    <form>
      <Grid
        templateColumns={`repeat(${isMobile ? 1 : isTablet ? 2 : 3}, 1fr)`}
        gap={inube.spacing.s300}
      >
        <Select
          name="renewal"
          id="renewal"
          label="Renovar producto al vencimiento"
          value={formik.values.renewal || ""}
          size="compact"
          isDisabled={loading}
          options={shareMaturityDM.options}
          onChange={customHandleChange}
          onBlur={formik.handleBlur}
          state={getFieldState(formik, "renewal")}
          errorMessage={formik.errors.renewal}
          isFullWidth
        />
      </Grid>
    </form>
  );
}

export { ShareMaturityFormUI };
