import { ValidationCard } from "@components/cards/ValidationCard";
import { Text } from "@design/data/Text";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Grid } from "@inubekit/grid";
import { Stack } from "@inubekit/stack";
import { FormikProps } from "formik";
import { ISystemValidationsEntry } from "./types";

interface SystemValidationsFormUIProps {
  loadingValids: boolean;
  formik: FormikProps<ISystemValidationsEntry>;
}

function SystemValidationsFormUI(props: SystemValidationsFormUIProps) {
  const { loadingValids, formik } = props;

  const isTablet = useMediaQuery("(max-width: 1100px)");

  const requiredValidations = formik.values.validations.filter(
    (validation) => validation.isRequired,
  );

  const notRequiredValidations = formik.values.validations.filter(
    (validation) => !validation.isRequired,
  );

  return (
    <Stack direction="column" gap={inube.spacing.s400}>
      {requiredValidations.length > 0 && (
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
            {requiredValidations.map((validation) => (
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
      )}

      {notRequiredValidations.length > 0 && (
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
            {notRequiredValidations.map((validation) => (
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
      )}
    </Stack>
  );
}

export { SystemValidationsFormUI };
