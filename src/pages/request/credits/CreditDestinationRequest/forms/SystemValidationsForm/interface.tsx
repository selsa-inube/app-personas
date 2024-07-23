import { ValidationCard } from "@components/cards/ValidationCard";
import { Text } from "@design/data/Text";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { FormikProps } from "formik";
import { ISystemValidationsEntry } from "./types";
import { Stack } from "@inubekit/stack";
import { Grid } from "@inubekit/grid";
import { inube } from "@design/tokens";

interface SystemValidationsFormUIProps {
  formik: FormikProps<ISystemValidationsEntry>;
}

function SystemValidationsFormUI(props: SystemValidationsFormUIProps) {
  const { formik } = props;

  const isTablet = useMediaQuery("(max-width: 1100px)");

  return (
    <Stack direction="column" gap={inube.spacing.s400}>
      <Stack direction="column" gap={inube.spacing.s200}>
        <Text type="title" size="medium" appearance="gray">
          Validaciones obligatorias
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
              />
            ))}
        </Grid>
      </Stack>

      <Stack direction="column" gap={inube.spacing.s200}>
        <Text type="title" size="medium" appearance="gray">
          Validaciones opcionales
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
              />
            ))}
        </Grid>
      </Stack>
    </Stack>
  );
}

export { SystemValidationsFormUI };
