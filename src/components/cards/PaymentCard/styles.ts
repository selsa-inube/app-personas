import { inube } from "@design/tokens";
import styled from "styled-components";

interface IStyledCardContainer {
  isMobile: boolean;
  isTablet: boolean;
}

const StyledCardContainer = styled.div<IStyledCardContainer>`
  display: flex;
  flex-direction: column;
  padding: ${inube.spacing.s300} ${inube.spacing.s250};
  gap: ${inube.spacing.s200};
  border-radius: ${inube.spacing.s100};
  background: ${({ theme }) =>
    theme.color?.surface?.light?.clear || inube.color.surface.light.clear};
  border: 1px solid
    ${({ theme }) =>
      theme.color?.stroke?.divider?.regular ||
      inube.color.stroke.divider.regular};
`;

interface IStyledInputContainer {
  disabled?: boolean;
}

const StyledInputContainer = styled.div<IStyledInputContainer>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${inube.spacing.s100};
  border-radius: ${inube.spacing.s100};
  padding: ${inube.spacing.s100} ${inube.spacing.s150};
  background: ${({ theme }) =>
    theme.color?.surface?.gray?.clear || inube.color.surface.gray.clear};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

const StyledInputRadio = styled.input`
  margin: 0;
  cursor: pointer;
  accent-color: ${({ theme }) =>
    theme.color?.surface?.primary?.regular ||
    inube.color.surface.primary.regular};
`;

export { StyledCardContainer, StyledInputContainer, StyledInputRadio };
