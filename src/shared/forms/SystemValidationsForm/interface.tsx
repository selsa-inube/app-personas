import { ValidationCard } from "@components/cards/ValidationCard";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Grid, Message, Stack } from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { ISystemValidationsEntry } from "./types";
import { loadingValidations } from "./utils";

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

  const failValidations = requiredValidations.filter(
    (validation) => validation.value === "fail",
  );

  const pendingValidations = requiredValidations.filter(
    (validation) => validation.value === "pending",
  );

  if (
    !loadingValids &&
    requiredValidations.every((validation) => validation.value !== "fail") &&
    (formik.values.validations.length > 0 || formik.values.successValids)
  ) {
    return (
      <Message
        appearance="success"
        title="Has cumplido con todas las validaciones."
        fullwidth
      />
    );
  }

  return (
    <>
      {loadingValids && (
        <Grid
          templateColumns={`repeat(${isMobile ? 1 : 2}, 1fr)`}
          autoRows="auto"
          gap={inube.spacing.s200}
          width="100%"
        >
          {loadingValidations.map((validation) => (
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
      )}

      {requiredValidations.length > 0 && (
        <Stack direction="column" gap={inube.spacing.s400}>
          {failValidations.length > 0 && !loadingValids && (
            <Stack direction="column" gap={inube.spacing.s200}>
              <Message
                appearance="danger"
                title="Hay una o más validaciones que no cumples. Revisa los detalles antes de continuar con el siguiente paso."
                fullwidth
              />
              <Grid
                templateColumns={`repeat(${isMobile ? 1 : 2}, 1fr)`}
                autoRows="auto"
                gap={inube.spacing.s200}
                width="100%"
              >
                {failValidations.map((validation) => (
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

          {pendingValidations.length > 0 && !loadingValids && (
            <Stack direction="column" gap={inube.spacing.s200}>
              <Message
                appearance="warning"
                title="Hay una o más validaciones que no pudimos evaluar. Durante el trámite intentaremos validar nuevamente."
                fullwidth
              />
              <Grid
                templateColumns={`repeat(${isMobile ? 1 : 2}, 1fr)`}
                autoRows="auto"
                gap={inube.spacing.s200}
                width="100%"
              >
                {pendingValidations.map((validation) => (
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
      )}
    </>
  );
}

export { SystemValidationsFormUI };
