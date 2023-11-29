import { inube } from "@design/tokens";
import styled from "styled-components";

interface IStyledModal {
  smallScreen: boolean;
}

const StyledModal = styled.div<IStyledModal>`
  display: flex;
  width: ${({ smallScreen }) => (smallScreen ? "312px" : "616px")};
  height: ${({ smallScreen }) => (smallScreen ? "592px" : "auto")};
  padding: ${inube.spacing.s300};
  flex-direction: column;
  gap: ${inube.spacing.s250};
  align-items: flex-end;
  border-radius: ${inube.spacing.s200};
  background-color: ${({ theme }) =>
    theme.color?.surface?.light?.clear || inube.color.surface.light.clear};
`;

interface IStyledScrollbar {
  smallScreen: boolean;
}

const StyledScrollbar = styled.div<IStyledScrollbar>`
  height: ${({ smallScreen }) => (smallScreen ? "446px" : "auto")};
  overflow: auto;

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) =>
      theme.color?.surface?.dark?.clear || inube.color.surface.dark.clear};
  }
`;

export { StyledModal, StyledScrollbar };
