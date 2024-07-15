import { ValidationCard } from "@components/cards/ValidationCard";
import { Text } from "@design/data/Text";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { FormikProps } from "formik";
import { ISystemValidationsEntry } from "./types";

interface SystemValidationsFormUIProps {
  formik: FormikProps<ISystemValidationsEntry>;
}

function SystemValidationsFormUI(props: SystemValidationsFormUIProps) {
  const { formik } = props;

  const isTablet = useMediaQuery("(max-width: 1100px)");

  return (
    <Stack direction="column" gap="s400">
      <Stack direction="column" gap="s200">
        <Text type="title" size="medium" appearance="gray">
          Validaciones obligatorias
        </Text>

        <Grid
          templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
          gap="s200"
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

      <Stack direction="column" gap="s200">
        <Text type="title" size="medium" appearance="gray">
          Validaciones opcionales
        </Text>

        <Grid
          templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
          gap="s200"
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
