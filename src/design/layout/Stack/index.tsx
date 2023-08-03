import { SpacingTokensType } from "@ptypes/spacing.types";
import { StyledStack } from "./styles";
import {
  AlignContentType,
  DirectionType,
  JustifyContentType,
  WrapType,
} from "./types";

interface StackProps {
  children: React.ReactNode;
  direction?: DirectionType;
  justifyContent?: JustifyContentType;
  alignItems?: AlignContentType;
  alignContent?: AlignContentType;
  gap?: SpacingTokensType;
  height?: string;
  width?: string;
  padding?: SpacingTokensType;
  margin?: SpacingTokensType;
  wrap?: WrapType;
}

function Stack(props: StackProps) {
  const {
    children,
    direction = "row",
    justifyContent = "flex-start",
    alignItems = "stretch",
    alignContent = "normal",
    gap = "s0",
    height = "auto",
    width = "auto",
    padding = "s0",
    margin = "s0",
    wrap = "nowrap",
  } = props;
  return (
    <StyledStack
      direction={direction}
      justifyContent={justifyContent}
      alignItems={alignItems}
      alignContent={alignContent}
      gap={gap}
      height={height}
      width={width}
      padding={padding}
      margin={margin}
      wrap={wrap}
    >
      {children}
    </StyledStack>
  );
}

export { Stack };
export type { StackProps };
