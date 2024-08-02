import { Text } from "@design/data/Text";
import { Switch } from "@design/input/Switch";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { FormikValues } from "formik";
import { termsAndConditionsTexts } from "./config/termsAndConditions";
import {
  StyledTermsAndConditionsContainer,
  StyledTermsAndConditionsInfo,
} from "./styles";
import { Stack } from "@inubekit/stack";
import { inube } from "@design/tokens";

function generateTermsAndConditionsParagraphs(texts: string[]) {
  return texts.map((text, index) => (
    <Text key={index} type="body" size="small">
      {text}
    </Text>
  ));
}

interface TermsAndConditionsFormUIProps {
  formik: FormikValues;
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
            {generateTermsAndConditionsParagraphs(termsAndConditionsTexts)}
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
      </Stack>
    </form>
  );
}

export { TermsAndConditionsFormUI };
