import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import {
  Link,
  Message,
  SkeletonLine,
  Stack,
  Text,
  Toggle,
} from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { StyledTermsAndConditionsContainer } from "./styles";
import { ITermsAndConditionsEntry } from "./types";

function SkeletonText(props: { isMobile?: boolean }) {
  const { isMobile } = props;
  return (
    <Stack direction="column" width="100%" gap={inube.spacing.s075}>
      <SkeletonLine animated width="100%" />
      <SkeletonLine animated width="100%" />
      <SkeletonLine animated width="100%" />
      <SkeletonLine animated width={isMobile ? "50%" : "15%"} />
    </Stack>
  );
}

const getTermsAndConditionsParag = (texts: string[]) => {
  if (!texts || texts.length === 0) {
    return null;
  }

  return texts.map((text, index) => (
    <Text key={index} type="body" size="small">
      {text}
    </Text>
  ));
};

interface TermsAndConditionsFormUIProps {
  formik: FormikProps<ITermsAndConditionsEntry>;
  loading?: boolean;
}

function TermsAndConditionsFormUI(props: TermsAndConditionsFormUIProps) {
  const { formik, loading } = props;

  const isMobile = useMediaQuery("(max-width: 560px)");

  return (
    <form>
      <Stack
        direction="column"
        alignItems="flex-start"
        gap={isMobile ? inube.spacing.s200 : inube.spacing.s300}
      >
        {!loading && formik.values.termsConditions.length == 0 ? (
          <Stack width="100%">
            <Message
              title="Actualmente no existen términos y condiciones por aceptar."
              appearance="help"
              fullwidth
            />
          </Stack>
        ) : (
          <StyledTermsAndConditionsContainer $isMobile={isMobile}>
            {loading ? (
              <Stack direction="column" gap={inube.spacing.s300}>
                <SkeletonText isMobile={isMobile} />
                <SkeletonText isMobile={isMobile} />
                <SkeletonText isMobile={isMobile} />
                <SkeletonText isMobile={isMobile} />
              </Stack>
            ) : (
              getTermsAndConditionsParag(formik.values.termsConditions)
            )}
          </StyledTermsAndConditionsContainer>
        )}

        <Stack
          direction="column"
          gap={isMobile ? inube.spacing.s100 : inube.spacing.s150}
          alignItems="flex-start"
        >
          {!loading && formik.values.termsConditions.length > 0 && (
            <Toggle
              id="accept"
              name="accept"
              size={isMobile ? "small" : "large"}
              onChange={formik.handleChange}
              checked={formik.values.accept}
              disabled={loading}
              margin="0"
              padding="0"
            >
              Acepto los términos y condiciones
            </Toggle>
          )}

          <Toggle
            id="acceptDataPolicy"
            name="acceptDataPolicy"
            size={isMobile ? "small" : "large"}
            onChange={formik.handleChange}
            checked={formik.values.acceptDataPolicy}
            disabled={loading}
            margin="0"
            padding="0"
          >
            Acepto la{" "}
            {formik.values.dataPolicyUrl ? (
              <Link
                type="label"
                size="large"
                path={formik.values.dataPolicyUrl}
                target="_blank"
                rel="noreferrer"
              >
                Política de tratamiento de datos
              </Link>
            ) : (
              "política de tratamiento de datos"
            )}
          </Toggle>
        </Stack>
      </Stack>
    </form>
  );
}

export { TermsAndConditionsFormUI };
