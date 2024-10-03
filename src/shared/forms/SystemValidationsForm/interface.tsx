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
  const isMobile = useMediaQuery("(max-width: 580px)");

  const requiredValidations = formik.values.validations.filter(
    (validation) => validation.isRequired,
  );

  const notRequiredValidations = formik.values.validations.filter(
    (validation) => !validation.isRequired,
  );

  if (!loadingValids && formik.values.validations.length === 0) {
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
    <Stack direction="column" gap={inube.spacing.s400}>
      {requiredValidations.length > 0 && (
        <Stack direction="column" gap={inube.spacing.s200}>
          <Text type="title" size="medium" appearance="gray">
            Obligatorias en la solicitud
          </Text>

          <Grid
            templateColumns={`repeat(${isMobile ? 1 : isTablet ? 2 : 3}, 1fr)`}
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

      {notRequiredValidations.length > 0 && (
        <Stack direction="column" gap={inube.spacing.s200}>
          <Text type="title" size="medium" appearance="gray">
            Por validar durante el trámite
          </Text>

          <Grid
            templateColumns={`repeat(${isMobile ? 1 : isTablet ? 2 : 3}, 1fr)`}
            autoRows="auto"
            gap={inube.spacing.s200}
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
