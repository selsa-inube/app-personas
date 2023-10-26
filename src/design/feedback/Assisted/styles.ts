import { inube } from "@design/tokens";
import styled from "styled-components";

interface IStyledButton {
  smallScreen: boolean;
}

interface IStyledAssistedContainer {
  smallScreen: boolean;
}

const StyledAssistedContainer = styled.div<IStyledAssistedContainer>`
  display: flex;
  flex-direction: column;
  gap: ${inube.spacing.s100};
  border-radius: ${({ smallScreen }) =>
    smallScreen ? inube.spacing.s100 : inube.spacing.s200};
  padding: ${({ smallScreen }) =>
    smallScreen ? inube.spacing.s150 : inube.spacing.s200};
  background-color: ${({ theme }) =>
    theme.color?.surface?.gray.clear || inube.color.surface.gray.clear};
`;

const StyledCircleId = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 17px;
  height: 17px;
  border: 3px solid
    ${({ theme }) =>
      theme.color?.stroke?.primary.regular ||
      inube.color.stroke.primary.regular};

  & p {
    letter-spacing: ${inube.spacing.s0};
  }
`;

const StyledButton = styled.div<IStyledButton>`
  & button {
    min-width: ${({ smallScreen }) => (smallScreen ? "auto" : "100px")};
    padding: 0
      ${({ smallScreen }) => (smallScreen ? "0px" : inube.spacing.s200)};
  }
`;

interface IStyledBarContainer {
  smallScreen: boolean;
}

const StyledBarContainer = styled.div<IStyledBarContainer>`
  width: 100%;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  background-color: ${({ theme }) =>
    inube.color.surface.dark.clear || theme.color?.surface?.dark.clear};
  height: ${({ smallScreen }) =>
    smallScreen ? inube.spacing.s100 : inube.spacing.s200};
`;

interface IStyledBar {
  smallScreen: boolean;
  width: number;
}

const StyledBar = styled.div<IStyledBar>`
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  transition: width 0.15s ease-in-out;
  background-color: ${({ theme }) =>
    theme.color?.text?.primary.regular || inube.color.text.primary.regular};
  height: ${({ smallScreen }) =>
    smallScreen ? inube.spacing.s100 : inube.spacing.s200};
  width: ${({ width }) => `${width}%`};
`;

export {
  StyledAssistedContainer,
  StyledBar,
  StyledBarContainer,
  StyledButton,
  StyledCircleId,
};
