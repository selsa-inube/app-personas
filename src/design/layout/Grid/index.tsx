import { StyledGrid } from "./styles";

import { SpacingTokensType } from "@ptypes/spacing.types";
import {
  GridJustifyItemsType,
  GridAlignItemsType,
  GridJustifyContentType,
  GridAlignContentType,
  GridAutoFlowType,
} from "./types";

interface GridProps {
  children: React.ReactNode;
  templateColumns?: string;
  templateRows?: string;
  gap?: SpacingTokensType;
  justifyItems?: GridJustifyItemsType;
  alignItems?: GridAlignItemsType;
  justifyContent?: GridJustifyContentType;
  alignContent?: GridAlignContentType;
  autoColumns?: string;
  autoRows?: string;
  autoFlow?: GridAutoFlowType;
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
      $templateColumns={templateColumns}
      $templateRows={templateRows}
      $gap={gap}
      $justifyItems={justifyItems}
      $alignItems={alignItems}
      $justifyContent={justifyContent}
      $alignContent={alignContent}
      $autoColumns={autoColumns}
      $autoRows={autoRows}
      $autoFlow={autoFlow}
      $margin={margin}
      $padding={padding}
      $height={height}
      $width={width}
    >
      {children}
    </StyledGrid>
  );
}

export { Grid };
export type { GridProps };
