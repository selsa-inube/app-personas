import { Stack } from "@design/layout/Stack";
import { Text } from "@design/data/Text";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { StyledFieldset } from "./styles";
import { inube } from "@design/tokens";

interface FieldsetProps {
  title: string;
  children: React.ReactNode;
}

function Fieldset(props: FieldsetProps) {
  const { title, children } = props;

  const smallScreen = useMediaQuery("(max-width: 750px)");

  return (
    <StyledFieldset smallScreen={smallScreen}>
      <legend>
        <Stack padding={inube.spacing.s050}>
          <Text type="title" size={smallScreen ? "small" : "medium"}>
            {title}
          </Text>
        </Stack>
      </legend>
      {children}
    </StyledFieldset>
  );
}

export { Fieldset };
export type { FieldsetProps };
