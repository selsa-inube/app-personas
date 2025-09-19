import { inube } from "@design/tokens";
import styled from "styled-components";

const StyledCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${inube.spacing.s200};
  gap: ${inube.spacing.s150};
  justify-content: space-between;
  background-color: ${({ theme }) =>
    theme?.color?.surface?.light?.clear || inube.color.surface.light.clear};
  border-radius: ${inube.spacing.s100};
  border: 1px solid
    ${({ theme }) =>
    theme?.color?.stroke?.divider?.regular ||
    inube.color.stroke.divider.regular};
  cursor: pointer;

  & label {
    cursor: pointer;
    user-select: none;
  }
`;

const StyledScrollbar = styled.div`
  max-height: 65dvh;
  width: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) =>
    theme.color?.surface?.dark?.clear || inube.color.surface.dark.clear};
  }
`;

export { StyledCardContainer, StyledScrollbar };
