import { inube } from "@design/tokens";
import styled from "styled-components";

interface IStyledModal {
  $isMobile: boolean;
  $isTablet: boolean;
}

const StyledModal = styled.div<IStyledModal>`
  display: flex;
  width: ${({ $isMobile, $isTablet }) =>
    $isMobile ? "280px" : $isTablet ? "568px" : "952px"};
  height: ${({ $isMobile }) => ($isMobile ? "560px" : "auto")};
  padding: ${inube.spacing.s300};
  flex-direction: column;
  gap: ${inube.spacing.s250};
  align-items: flex-end;
  border-radius: ${inube.spacing.s200};
  background-color: ${({ theme }) =>
    theme.color?.surface?.light?.clear || inube.color.surface.light.clear};
`;

interface IStyledScrollbar {
  $isMobile: boolean;
}

const StyledScrollbar = styled.div<IStyledScrollbar>`
  height: ${({ $isMobile }) => ($isMobile ? "446px" : "auto")};
  width: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: ${({ $isMobile }) =>
    $isMobile ? inube.spacing.s150 : inube.spacing.s100};
  padding: ${({ $isMobile }) =>
    $isMobile ? inube.spacing.s050 : inube.spacing.s0};

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) =>
      theme.color?.surface?.dark?.clear || inube.color.surface.dark.clear};
  }
`;

export { StyledModal, StyledScrollbar };
