import { inube } from "@design/tokens";
import styled from "styled-components";

interface IStyledModal {
  $smallScreen: boolean;
}

const StyledModal = styled.div<IStyledModal>`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) =>
    theme.color?.surface?.light?.clear || inube.color.surface.light.clear};
  width: ${({ $smallScreen }) => ($smallScreen ? "280px" : "500px")};
  padding: ${({ $smallScreen }) =>
    $smallScreen ? inube.spacing.s200 : inube.spacing.s300};
  gap: ${({ $smallScreen }) =>
    $smallScreen ? inube.spacing.s200 : inube.spacing.s300};
  border-radius: ${inube.spacing.s100};
`;

const StyledBody = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: ${inube.spacing.s100};
  gap: ${inube.spacing.s100};
  padding: ${inube.spacing.s100};
  background-color: ${({ theme }) =>
    theme.color?.surface?.gray?.clear || inube.color.surface.gray.clear};
`;

export { StyledBody, StyledModal };
