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

interface IStyledInputRadio {
  $cursorPointer?: boolean;
}

const StyledInputRadio = styled.input<IStyledInputRadio>`
  margin: 0;
  cursor: ${({ $cursorPointer }) => ($cursorPointer ? "pointer" : "default")};
  accent-color: ${({ theme }) =>
    theme.radioField?.background?.color?.checked ||
    inube.color.surface.primary.regular};
`;

const StyledLabel = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: ${inube.spacing.s100};
  padding: ${inube.spacing.s100};
  background-color: ${({ theme }) =>
    theme.color.surface.gray.clear || inube.color.surface.gray.clear};
  align-items: center;
`;

export { StyledCardContainer, StyledInputRadio, StyledLabel };
