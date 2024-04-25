import { inube } from "@design/tokens";
import styled from "styled-components";

interface IStyledModal {
  smallScreen: boolean;
}

const StyledModal = styled.div<IStyledModal>`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: ${({ smallScreen }) => (smallScreen ? "312px" : "598px")};
  height: ${({ smallScreen }) => (smallScreen ? "596px" : "752px")};
  border-radius: ${inube.spacing.s200};
  padding: ${({ smallScreen }) =>
    smallScreen ? inube.spacing.s200 : inube.spacing.s300};
  gap: ${({ smallScreen }) =>
    smallScreen ? inube.spacing.s200 : inube.spacing.s250};
  background-color: ${({ theme }) =>
    theme.color?.surface?.light?.clear || inube.color.surface.light.clear};
`;

interface IStyledContainer {
  smallScreen: boolean;
}

const StyledContainer = styled.div<IStyledContainer>`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: ${({ smallScreen }) => (smallScreen ? "280px" : "550px")};
  height: ${({ smallScreen }) => (smallScreen ? "392px" : "612px")};
  gap: ${({ smallScreen }) =>
    smallScreen ? inube.spacing.s150 : inube.spacing.s200};
  padding: ${({ smallScreen }) =>
    smallScreen
      ? `${inube.spacing.s150} ${inube.spacing.s200}`
      : `${inube.spacing.s200} ${inube.spacing.s250}`};

  border-radius: ${inube.spacing.s100};
  border: 1px solid
    ${({ theme }) =>
      theme.color?.stroke?.divider?.regular ||
      inube.color.stroke.divider.regular};
`;

const StyledResume = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: ${inube.spacing.s100};
  padding: ${inube.spacing.s150} ${inube.spacing.s200};
  border-radius: ${inube.spacing.s100};
  border: 1px solid
    ${({ theme }) =>
      theme.color?.stroke?.divider?.regular ||
      inube.color.stroke.divider.regular};
`;

const StyledContainerItems = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: ${inube.spacing.s200};
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) =>
      theme.color?.surface?.dark?.clear || inube.color.surface.dark.clear};
  }
`;

interface IStyledItem {
  smallScreen: boolean;
}

const StyledItem = styled.div<IStyledItem>`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  border-radius: ${inube.spacing.s100};
  padding: ${({ smallScreen }) =>
    smallScreen
      ? `${inube.spacing.s100}`
      : `${inube.spacing.s075} ${inube.spacing.s200}`};
  background-color: ${({ theme }) =>
    theme.color?.surface?.gray?.clear || inube.color.surface.gray.clear};
`;

export {
  StyledModal,
  StyledContainer,
  StyledResume,
  StyledContainerItems,
  StyledItem,
};
