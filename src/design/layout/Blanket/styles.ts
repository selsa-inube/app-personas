import { inube } from "@design/tokens";
import styled from "styled-components";
import { JustifyContentType } from "../Stack/types";
import { SpacingTokensType } from "@ptypes/spacing.types";

interface IStyledBlanket {
  smallScreen: boolean;
  justifyContent: JustifyContentType;
  padding?: SpacingTokensType;
}

const StyledBlanket = styled.div<IStyledBlanket>`
  position: fixed;
  display: flex;
  border: none;
  overflow-y: auto;
  inset: 0;
  z-index: 3;
  justify-content: ${({ justifyContent }) => justifyContent};
  padding-right: ${({ padding, theme }) =>
    theme.spacing?.[padding as keyof typeof inube.spacing] ||
    inube.spacing[padding as keyof typeof inube.spacing] ||
    padding};
  background-color: ${({ theme }) =>
    theme.color?.surface?.blanket?.regular ||
    inube.color.surface.blanket.regular};
`;

export { StyledBlanket };
