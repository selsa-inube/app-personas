import { inube } from "@design/tokens";
import styled from "styled-components";

const StyledCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${inube.spacing.s200};
  align-items: center;
  gap: ${inube.spacing.s150};
  border-radius: ${inube.spacing.s100};
  background: ${({ theme }) =>
    theme.color?.surface?.light?.clear || inube.color.surface.light.clear};
  box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  user-select: none;
`;

const StyledInputRadio = styled.input`
  cursor: pointer;
  accent-color: ${({ theme }) =>
    theme.radioField?.background?.color?.checked ||
    inube.color.surface.primary.regular};
  margin: 0;
`;

interface IStyledBody {
  $loading?: boolean;
}

const StyledBody = styled.div<IStyledBody>`
  display: flex;
  flex-direction: column;
  padding: ${inube.spacing.s100};
  gap: ${inube.spacing.s050};
  border-radius: ${inube.spacing.s100};
  background: ${({ theme, $loading }) =>
    $loading
      ? "transparent"
      : theme.color?.surface?.gray?.clear || inube.color.surface.gray.clear};
  width: 100%;
`;

export { StyledBody, StyledCardContainer, StyledInputRadio };
