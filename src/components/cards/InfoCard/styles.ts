import { inube } from "@design/tokens";
import styled from "styled-components";
import { InfoCardAppearanceType } from "./types";

interface IStyledCardContainer {
  $appearance: InfoCardAppearanceType;
}

const StyledCardContainer = styled.div<IStyledCardContainer>`
  display: flex;
  padding: ${inube.spacing.s200};
  align-items: center;
  gap: ${inube.spacing.s200};

  border-radius: ${inube.spacing.s050};
  box-shadow: 0px 1px 3px 1px rgba(9, 30, 66, 0.13);
  background-color: ${({ theme, $appearance }) =>
    theme?.color?.surface?.[$appearance]?.clear ||
    inube.color.surface[$appearance].clear};
`;

export { StyledCardContainer };
