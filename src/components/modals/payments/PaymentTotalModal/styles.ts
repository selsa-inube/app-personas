import { inube } from "@design/tokens";
import styled from "styled-components";

interface IStyledModal {
  smallScreen: boolean;
  tabletScreen: boolean;
}

const StyledModal = styled.div<IStyledModal>`
  position: fixed;
  top: ${inube.spacing.s300};
  bottom: ${inube.spacing.s300};
  right: ${({ smallScreen }) => (smallScreen ? "none" : inube.spacing.s300)};
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  width: ${({ smallScreen }) => (smallScreen ? "312px" : "400px")};
  padding: ${inube.spacing.s300};
  flex-direction: column;
  gap: ${({ smallScreen }) =>
    smallScreen ? inube.spacing.s200 : inube.spacing.s250};
  border-radius: ${inube.spacing.s200};
  background-color: ${({ theme }) =>
    theme.color?.surface?.light?.clear || inube.color.surface.light.clear};
`;

interface IStyledCardContainer {
  smallScreen: boolean;
  tabletScreen: boolean;
}

const StyledCardContainer = styled.div<IStyledCardContainer>`
  display: flex;
  flex-direction: column;
  max-width: 352px;
  max-height: ${({ smallScreen, tabletScreen }) =>
    smallScreen ? "380px" : tabletScreen ? "865px" : "756px"};
  gap: ${inube.spacing.s150};
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) =>
      theme.color?.surface?.dark?.clear || inube.color.surface.dark.clear};
  }
`;

const StyledTotalPayment = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${inube.spacing.s100} ${inube.spacing.s200};
  gap: ${inube.spacing.s150};
  border-radius: ${inube.spacing.s100};
  background: ${({ theme }) =>
    theme.color?.surface?.light?.clear || inube.color.surface.light.clear};
  border: 1px solid
    ${({ theme }) =>
      theme.color?.stroke?.divider?.regular ||
      inube.color.stroke.divider.regular};
`;

export { StyledModal, StyledCardContainer, StyledTotalPayment };
