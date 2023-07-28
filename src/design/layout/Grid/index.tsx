import { StyledGrid } from "./styles";

import { SpacingTokensType } from "src/types/spacing.types";

import {
  JustifyItemsType,
  AlignItemsType,
  JustifyContentType,
  AlignContentType,
  AutoFlowType,
} from "src/types/design.types";

interface GridProps {
  children: React.ReactNode;
  templateColumns?: string;
  templateRows?: string;
  gap?: SpacingTokensType;
  justifyItems?: JustifyItemsType;
  alignItems?: AlignItemsType;
  justifyContent?: JustifyContentType;
  alignContent?: AlignContentType;
  autoColumns?: string;
  autoRows?: string;
  autoFlow?: AutoFlowType;
  margin?: SpacingTokensType;
  padding?: SpacingTokensType;
  height?: string;
  width?: string;
}

function Grid(props: GridProps) {
  const {
    children,
    templateColumns,
    templateRows,
    gap = "s0",
    justifyItems = "stretch",
    alignItems = "stretch",
    justifyContent = "start",
    alignContent = "start",
    autoColumns = "auto",
    autoRows,
    autoFlow = "row",
    margin = "s0",
    padding = "s0",
    height = "auto",
    width = "auto",
  } = props;

  return (
    <StyledGrid
      templateColumns={templateColumns}
      templateRows={templateRows}
      gap={gap}
      justifyItems={justifyItems}
      alignItems={alignItems}
      justifyContent={justifyContent}
      alignContent={alignContent}
      autoColumns={autoColumns}
      autoRows={autoRows}
      autoFlow={autoFlow}
      margin={margin}
      padding={padding}
      height={height}
      width={width}
    >
      {children}
    </StyledGrid>
  );
}

export type { GridProps };
export { Grid };
