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
  gap?: string;
  height?: string;
  width?: string;
  padding?: string;
  margin?: string;
  wrap?: WrapType;
}

function Stack(props: StackProps) {
  const {
    children,
    direction = "row",
    justifyContent = "flex-start",
    alignItems = "stretch",
    alignContent = "normal",
    gap = "0px",
    height = "auto",
    width = "auto",
    padding = "0px",
    margin = "0px",
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