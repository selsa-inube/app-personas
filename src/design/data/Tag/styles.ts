import styled from "styled-components";
import { inube } from "../../tokens";
import { TagAppearanceType, TagModifierType } from "./types";

interface IStyledTag {
  appearance: TagAppearanceType;
  modifier: TagModifierType;
}

const StyledTag = styled.div<IStyledTag>`
  display: flex;
  align-items: center;
  padding: 0 ${inube.spacing.s050};
  background-color: ${({ theme, appearance, modifier }) =>
    theme.color?.surface?.[appearance]?.[modifier] ||
    inube.color.surface[appearance][modifier]};

  border-radius: 4px;
  gap: ${inube.spacing.s050};
  width: fit-content;
`;

export { StyledTag };
