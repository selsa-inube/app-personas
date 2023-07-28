import styled from "styled-components";
import { inube } from "@design/tokens";
import { SpacingTokensType } from "src/types/spacing.types";
import {
  AlignContentType,
  DirectionType,
  JustifyContentType,
  WrapType,
} from "./types";

interface IStyledStack {
  direction?: DirectionType;
  justifyContent?: JustifyContentType;
  alignItems?: AlignContentType;
  alignContent?: AlignContentType;
  gap: SpacingTokensType;
  height?: string;
  width?: string;
  padding: SpacingTokensType;
  margin: SpacingTokensType;
  wrap?: WrapType;
}

const StyledStack = styled.div<IStyledStack>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  align-content: ${({ alignContent }) => alignContent};
  flex-wrap: ${({ wrap }) => wrap};
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

export { StyledStack };
