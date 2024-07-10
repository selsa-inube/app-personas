import { TextAppearanceType } from "@ptypes/color.types";
import { SpacingTokensType } from "@ptypes/spacing.types";
import { TypographySizeType, TypographyType } from "@ptypes/typography.types";
import { StyledText } from "./styles";
import { TextAlignType, TextAsTagsType } from "./types";

interface TextProps {
  children: React.ReactNode;
  as?: TextAsTagsType;
  margin?: SpacingTokensType;
  padding?: SpacingTokensType;
  appearance?: TextAppearanceType;
  type?: TypographyType;
  size?: TypographySizeType;
  textAlign?: TextAlignType;
  cursorHover?: boolean;
  parentHover?: boolean;
  disabled?: boolean;
  ellipsis?: boolean;
  onClick?: () => void;
}

function Text(props: TextProps) {
  const {
    children,
    as = "p",
    margin = "s0",
    padding = "s0",
    appearance = "dark",
    type = "body",
    size = "large",
    textAlign = "start",
    cursorHover = false,
    parentHover = false,
    disabled = false,
    ellipsis = false,
    onClick,
  } = props;
  return (
    <StyledText
      as={as}
      $margin={margin}
      $padding={padding}
      $appearance={appearance}
      $type={type}
      $size={size}
      $textAlign={textAlign}
      $cursorHover={cursorHover}
      $parentHover={parentHover}
      $disabled={disabled}
      $ellipsis={ellipsis}
      onClick={onClick}
    >
      {children}
    </StyledText>
  );
}

export { Text };
export type { TextProps };
