import styled from "styled-components";

import {
  JustifyItemsType,
  AlignItemsType,
  JustifyContentType,
  AlignContentType,
  AutoFlowType,
} from "src/types/design.types";

interface IStyledGrid {
  templateColumns?: string;
  templateRows?: string;
  gap?: string;
  justifyItems?: JustifyItemsType;
  alignItems?: AlignItemsType;
  justifyContent?: JustifyContentType;
  alignContent?: AlignContentType;
  autoColumns?: string;
  autoRows?: string;
  autoFlow?: AutoFlowType;
  margin?: string;
  padding?: string;
  height?: string;
  width?: string;
}

const StyledGrid = styled.div<IStyledGrid>`
  display: grid;
  grid-template-columns: ${({ templateColumns }) => templateColumns};
  grid-template-rows: ${({ templateRows }) => templateRows};
  gap: ${({ gap }) => gap};
  justify-items: ${({ justifyItems }) => justifyItems};
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-content: ${({ alignContent }) => alignContent};
  grid-auto-columns: ${({ autoColumns }) => autoColumns && autoColumns};
  grid-auto-rows: ${({ autoRows }) => autoRows && autoRows};
  grid-auto-flow: ${({ autoFlow }) => autoFlow};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  height: ${({ height }) => height};
  width: ${({ width }) => width};
`;

export { StyledGrid };
