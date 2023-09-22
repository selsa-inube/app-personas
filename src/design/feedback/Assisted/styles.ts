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
  gap: ${inube.spacing.s150};
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
export { StyledAssistedContainer, StyledCircleId, StyledButton };
