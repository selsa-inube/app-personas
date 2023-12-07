import { Text } from "@design/data/Text";
import { Stack } from "@design/layout/Stack";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { TypographySizeType, TypographyType } from "@ptypes/typography.types";
import { StyledFieldset } from "./styles";

interface FieldsetProps {
  title: string;
  children: React.ReactNode;
  type?: TypographyType;
  size?: TypographySizeType;
}

function Fieldset(props: FieldsetProps) {
  const { title, children, type = "title", size = "medium" } = props;

  const isMobile = useMediaQuery("(max-width: 740px)");

  return (
    <StyledFieldset isMobile={isMobile}>
      <legend>
        <Stack padding={inube.spacing.s050}>
          <Text type={type} size={size}>
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
