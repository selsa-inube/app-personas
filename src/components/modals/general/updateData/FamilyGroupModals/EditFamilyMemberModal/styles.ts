import { inube } from "@design/tokens";
import styled from "styled-components";

interface IStyledModal {
  $smallScreen: boolean;
}

const StyledModal = styled.div<IStyledModal>`
  display: flex;
  width: ${({ $smallScreen }) => ($smallScreen ? "85dvw" : "402px")};
  padding: ${({ $smallScreen }) =>
    $smallScreen ? inube.spacing.s200 : inube.spacing.s300};
  flex-direction: column;
  gap: ${({ $smallScreen }) =>
    $smallScreen ? inube.spacing.s200 : inube.spacing.s250};
  align-items: flex-end;
  border-radius: ${inube.spacing.s200};
  background-color: ${({ theme }) =>
    theme.color?.surface?.light?.clear || inube.color.surface.light.clear};
`;

const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${inube.spacing.s050};
  padding: ${inube.spacing.s100} ${inube.spacing.s150};
  border-radius: 8px;
  background-color: ${({ theme }) =>
    theme.color?.surface?.gray?.clear || inube.color.surface.gray.clear};
`;

export { StyledModal, StyledBox };