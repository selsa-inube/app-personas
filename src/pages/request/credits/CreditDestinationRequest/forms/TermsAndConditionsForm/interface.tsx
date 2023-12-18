import { Text } from "@design/data/Text";
import { Switch } from "@design/input/Switch";
import { Stack } from "@design/layout/Stack";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { FormikValues } from "formik";
import { termsAndConditionsTexts } from "./config/termsAndConditions";
import {
  StyledTermsAndConditionsContainer,
  StyledTermsAndConditionsInfo,
} from "./styles";

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
          onChange={customHandleChange}
          checked={formik.values.accept}
          disabled={loading}
        />
      </Stack>
    </form>
  );
}

export { TermsAndConditionsFormUI };
