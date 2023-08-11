import { inube } from "@design/tokens";
import { SpacingTokensType } from "@ptypes/spacing.types";
import styled from "styled-components";
import {
  GridJustifyItemsType,
  GridAlignItemsType,
  GridJustifyContentType,
  GridAlignContentType,
  GridAutoFlowType,
} from "./types";

interface IStyledGrid {
  templateColumns?: string;
  templateRows?: string;
  gap: SpacingTokensType;
  justifyItems?: GridJustifyItemsType;
  alignItems?: GridAlignItemsType;
  justifyContent?: GridJustifyContentType;
  alignContent?: GridAlignContentType;
  autoColumns?: string;
  autoRows?: string;
  autoFlow?: GridAutoFlowType;
  margin: SpacingTokensType;
  padding: SpacingTokensType;
  height?: string;
  width?: string;
}

const StyledGrid = styled.div<IStyledGrid>`
  display: grid;
  grid-template-columns: ${({ templateColumns }) => templateColumns};
  grid-template-rows: ${({ templateRows }) => templateRows};
  justify-items: ${({ justifyItems }) => justifyItems};
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-content: ${({ alignContent }) => alignContent};
  grid-auto-columns: ${({ autoColumns }) => autoColumns && autoColumns};
  grid-auto-rows: ${({ autoRows }) => autoRows && autoRows};
  grid-auto-flow: ${({ autoFlow }) => autoFlow};
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  margin: ${({ margin, theme }) =>
    theme.spacing?.[margin] ||
    inube.spacing[margin as keyof typeof inube.spacing] ||
    margin};
  padding: ${({ padding, theme }) =>
    theme.spacing?.[padding] ||
    inube.spacing[padding as keyof typeof inube.spacing] ||
    padding};
  gap: ${({ gap, theme }) =>
    theme.spacing?.[gap] ||
    inube.spacing[gap as keyof typeof inube.spacing] ||
    gap};
`;

export { StyledGrid };
