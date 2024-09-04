import { Switch } from "@design/input/Switch";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Link } from "@inubekit/link";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { FormikProps } from "formik";
import {
  StyledTermsAndConditionsContainer,
  StyledTermsAndConditionsInfo,
} from "./styles";
import { ITermsAndConditionsEntry } from "./types";

const getTermsAndConditionsParag = (texts: string[]) => {
  return texts.map((text, index) => (
    <Text key={index} type="body" size="small">
      {text}
    </Text>
  ));
};

function CustomLabelPolicy(props: { url: string }) {
  const { url } = props;

  return (
    <Text type="label" size="large">
      Acepto la{" "}
      <Link
        type="label"
        size="large"
        path={url}
        target="_blank"
        rel="noreferrer"
      >
        Política de tratamiento de datos
      </Link>
    </Text>
  );
}

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
        <StyledTermsAndConditionsContainer $isMobile={isMobile}>
          <StyledTermsAndConditionsInfo $isMobile={isMobile}>
            {getTermsAndConditionsParag(formik.values.termsConditions)}
          </StyledTermsAndConditionsInfo>
        </StyledTermsAndConditionsContainer>
        <Switch
          id="accept"
          name="accept"
          label="Acepto los términos y condiciones"
          size={isMobile ? "small" : "large"}
          onChange={formik.handleChange}
          checked={formik.values.accept}
          disabled={loading}
        />
        <Switch
          id="acceptDataPolicy"
          name="acceptDataPolicy"
          customLabel={<CustomLabelPolicy url={formik.values.dataPolicyUrl} />}
          label="Acepto la Política de tratamiento de datos"
          size={isMobile ? "small" : "large"}
          onChange={formik.handleChange}
          checked={formik.values.acceptDataPolicy}
          disabled={loading}
        />
      </Stack>
    </form>
  );
}

export { TermsAndConditionsFormUI };
