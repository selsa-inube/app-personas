import { Text } from "@design/data/Text";
import { Stack } from "@design/layout/Stack";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { StyledBoxAttribute } from "./styles";

interface BoxAttributeProps {
  label: string;
  value: string;
}

function BoxAttribute(props: BoxAttributeProps) {
  const { label, value } = props;

  const smallScreen = useMediaQuery("(max-width: 750px)");

  return (
    <StyledBoxAttribute smallScreen={smallScreen}>
      <Stack justifyContent="space-between" alignItems="center">
        <Text
          type="label"
          size={smallScreen ? "small" : "medium"}
          appearance="dark"
        >
          {label}
        </Text>

        <Text
          type="body"
          size={smallScreen ? "small" : "medium"}
          appearance="gray"
        >
          {value}
        </Text>
      </Stack>
    </StyledBoxAttribute>
  );
}

export { BoxAttribute };
export type { BoxAttributeProps };
