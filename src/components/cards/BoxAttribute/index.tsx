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

  const smallScreen = useMediaQuery("(min-width: 450px)");

  return (
    <StyledBoxAttribute>
      <Stack justifyContent="space-between">
        <Text type="label" size={smallScreen ? "small" : "medium"}>
          {label}
        </Text>

        <Text type="body" size={smallScreen ? "small" : "medium"}>
          {value}
        </Text>
      </Stack>
    </StyledBoxAttribute>
  );
}

export { BoxAttribute };
export type { BoxAttributeProps };
