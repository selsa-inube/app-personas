import { FormikValues } from "formik";
import { Switch } from "@design/input/Switch";
import { Stack } from "@design/layout/Stack";
import { Text } from "@design/data/Text";
import {
  StyledTermsAndConditionsInfo,
  StyledTermsAndConditionsContainer,
} from "./styles";
import { termsAndConditionsTexts } from "./config/termsAndConditions";
import { useMediaQuery } from "@hooks/useMediaQuery";

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
  customHandleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function TermsAndConditionsFormUI(props: TermsAndConditionsFormUIProps) {
  const { formik, loading, customHandleChange } = props;

  const isMobile = useMediaQuery("(max-width: 560px)");

  return (
    <form>
      <Stack
        direction="column"
        alignItems="flex-start"
        gap={isMobile ? "s200" : "s300"}
      >
        <StyledTermsAndConditionsContainer isMobile={isMobile}>
          <StyledTermsAndConditionsInfo isMobile={isMobile}>
            {generateTermsAndConditionsParagraphs(termsAndConditionsTexts)}
          </StyledTermsAndConditionsInfo>
        </StyledTermsAndConditionsContainer>
        <Switch
          id="accept"
          name="accept"
          label="Acepto los términos y condiciones"
          size={isMobile ? "small" : "large"}
          handleChange={customHandleChange}
          checked={formik.values.accept}
          disabled={loading}
        />
      </Stack>
    </form>
  );
}

export { TermsAndConditionsFormUI };
