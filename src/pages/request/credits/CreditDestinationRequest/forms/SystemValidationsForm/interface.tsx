import { ValidationCard } from "@components/cards/ValidationCard";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Grid } from "@inubekit/grid";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { FormikProps } from "formik";
import { ISystemValidationsEntry } from "./types";

interface SystemValidationsFormUIProps {
  loadingValids: boolean;
  formik: FormikProps<ISystemValidationsEntry>;
}

function SystemValidationsFormUI(props: SystemValidationsFormUIProps) {
  const { loadingValids, formik } = props;

  const isTablet = useMediaQuery("(max-width: 1100px)");

  return (
    <Stack direction="column" gap={inube.spacing.s400}>
      <Stack direction="column" gap={inube.spacing.s200}>
        <Text type="title" size="medium" appearance="gray">
          Obligatorias en la solicitud
        </Text>

        <Grid
          templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
          autoRows="auto"
          gap={inube.spacing.s300}
          width="100%"
        >
          {formik.values.validations
            .filter((validation) => validation.isRequired)
            .map((validation) => (
              <ValidationCard
                id={validation.id}
                label={validation.label}
                failDetails={validation.failDetails}
                value={validation.value}
                key={validation.id}
                pending={loadingValids}
              />
            ))}
        </Grid>
      </Stack>

      <Stack direction="column" gap={inube.spacing.s200}>
        <Text type="title" size="medium" appearance="gray">
          Por validar durante el trámite
        </Text>

        <Grid
          templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
          autoRows="auto"
          gap={inube.spacing.s300}
          width="100%"
        >
          {formik.values.validations
            .filter((validation) => !validation.isRequired)
            .map((validation) => (
              <ValidationCard
                id={validation.id}
                label={validation.label}
                failDetails={validation.failDetails}
                value={validation.value}
                key={validation.id}
                pending={loadingValids}
              />
            ))}
        </Grid>
      </Stack>
    </Stack>
  );
}

export { SystemValidationsFormUI };
