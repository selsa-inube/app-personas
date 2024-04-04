import { inube } from "@design/tokens";
import styled from "styled-components";

const StyledCardContainer = styled.div`
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

const StyledInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: ${inube.spacing.s100};
  padding: ${inube.spacing.s100} ${inube.spacing.s150};
  background: ${({ theme }) =>
    theme.color?.surface?.gray?.clear || inube.color.surface.gray.clear};
  cursor: pointer;
`;

const StyledInputRadio = styled.input`
  margin: 0;
  cursor: pointer;
  accent-color: ${({ theme }) =>
    theme.color?.surface?.primary?.regular ||
    inube.color.surface.primary.regular};
`;

export { StyledCardContainer, StyledInputContainer, StyledInputRadio };
