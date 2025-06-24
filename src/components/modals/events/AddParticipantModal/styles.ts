import { inube } from "@design/tokens";
import styled from "styled-components";

interface IStyledModal {
  $smallScreen: boolean;
}

const StyledModal = styled.div<IStyledModal>`
  display: flex;
  width: ${({ $smallScreen }) => ($smallScreen ? "80%" : "450px")};
  padding: ${({ $smallScreen }) =>
    $smallScreen ? inube.spacing.s200 : inube.spacing.s300};
  flex-direction: column;
  gap: ${inube.spacing.s250};

  border-radius: ${inube.spacing.s200};
  background-color: ${({ theme }) =>
    theme.color?.surface?.light?.clear || inube.color.surface.light.clear};
`;

interface IStyledModalContent {
  $smallScreen: boolean;
}

const StyledModalContent = styled.div<IStyledModalContent>`
  display: flex;
  flex-direction: column;
  gap: ${inube.spacing.s150};
  max-height: ${({ $smallScreen }) => ($smallScreen ? "60vh" : "70vh")};
  overflow: visible;
`;

export { StyledModal, StyledModalContent };
