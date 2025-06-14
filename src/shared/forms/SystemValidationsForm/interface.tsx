import { ValidationCard } from "@components/cards/ValidationCard";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Grid, Stack, Text } from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { ISystemValidationsEntry } from "./types";

interface SystemValidationsFormUIProps {
  loadingValids: boolean;
  formik: FormikProps<ISystemValidationsEntry>;
}

function SystemValidationsFormUI(props: SystemValidationsFormUIProps) {
  const { loadingValids, formik } = props;

  const isMobile = useMediaQuery("(max-width: 580px)");

  const requiredValidations = formik.values.validations.filter(
    (validation) => validation.required,
  );

  if (!loadingValids && requiredValidations.length === 0) {
    return (
      <Stack width="100%">
        <Text type="label" size="large" appearance="gray">
          Actualmente no hay validaciones por realizar en el sistema. Puedes
          continuar con el siguiente paso de navegación.
        </Text>
      </Stack>
    );
  }

  return (
    <>
      {requiredValidations.length > 0 && (
        <Stack direction="column" gap={inube.spacing.s200}>
          <Grid
            templateColumns={`repeat(${isMobile ? 1 : 2}, 1fr)`}
            autoRows="auto"
            gap={inube.spacing.s200}
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
    </>
  );
}

export { SystemValidationsFormUI };
