import { inube } from "@design/tokens";
import styled from "styled-components";
import { RadioCardAppearanceType, RadioCardSizeType } from "./types";

interface IStyledCardContainer {
  size: RadioCardSizeType;
  appearance: RadioCardAppearanceType;
}

const StyledCardContainer = styled.div<IStyledCardContainer>`
  display: flex;
  padding: ${({ size }) =>
    size === "compact"
      ? `${inube.spacing.s100} ${inube.spacing.s150}`
      : inube.spacing.s200};
  height: 52px;
  align-items: center;
  gap: ${inube.spacing.s150};
  border-radius: ${({ size }) =>
    size === "compact" ? inube.spacing.s100 : inube.spacing.s050};
  background: ${({ theme, appearance }) =>
    theme.color?.surface[appearance]?.clear ||
    inube.color.surface[appearance].clear};
  box-shadow: ${({ size }) =>
    size === "compact"
      ? "none"
      : `0px 1px 3px 1px rgba(0, 0, 0, 0.15),
          0px 1px 2px 0px rgba(0, 0, 0, 0.3)`};
  cursor: pointer;
  user-select: none;
`;

const StyledInputRadio = styled.input`
  cursor: pointer;
  accent-color: ${({ theme }) =>
    theme.color?.surface?.primary?.regular ||
    inube.color.surface.primary.regular};
  margin: 0;
`;

export { StyledCardContainer, StyledInputRadio };
