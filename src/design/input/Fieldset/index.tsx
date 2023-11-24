import { Text } from "@design/data/Text";
import { Stack } from "@design/layout/Stack";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { StyledFieldset } from "./styles";

interface FieldsetProps {
  title: string;
  children: React.ReactNode;
}

function Fieldset(props: FieldsetProps) {
  const { title, children } = props;

  const isMobile = useMediaQuery("(max-width: 750px)");

  return (
    <StyledFieldset smallScreen={isMobile}>
      <legend>
        <Stack padding={inube.spacing.s050}>
          <Text type="title" size={isMobile ? "small" : "medium"}>
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
