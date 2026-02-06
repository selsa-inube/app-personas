import { inube } from "@design/tokens";
import styled from "styled-components";

interface IStyledInfoCard {
  $appearance: "primary" | "success" | "warning" | "danger" | "help" | "dark" | "gray" | "light";
}

const StyledInfoCard = styled.div<IStyledInfoCard>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${inube.spacing.s075} ${inube.spacing.s200};
  gap: ${inube.spacing.s025};
  border-radius: ${inube.spacing.s100};
  background: ${({ theme, $appearance }) =>
    theme.color?.surface[$appearance]?.clear ||
    inube.color.surface[$appearance].clear};
`;

const StyledButtonContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0px ${inube.spacing.s050} 0px ${inube.spacing.s025};
  gap: ${inube.spacing.s100};
  border-radius: ${inube.spacing.s050};
  background-color: ${({ theme }) =>
    theme.color?.surface?.gray?.regular || inube.color.surface.gray.regular};
  cursor: pointer;
`;

const StyledButtonIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export { StyledInfoCard, StyledButtonContainer, StyledButtonIcon };
export type { IStyledInfoCard };
