import { inube } from "@design/tokens";
import styled from "styled-components";

interface IStyledCollapseIcon {
  collapse: boolean;
}

const StyledCollapseIcon = styled.div<IStyledCollapseIcon>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  margin: auto 0;
  transition: all 500ms ease;
  transform: ${({ collapse }) =>
    collapse ? "rotate(-90deg)" : "rotate(90deg)"};
`;

interface IStyledSectionContainer {
  selected: boolean;
}

const StyledSectionContainer = styled.div<IStyledSectionContainer>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${inube.spacing.s200} ${inube.spacing.s300};
  background-color: ${({ theme, selected }) =>
    selected
      ? theme.color?.surface?.navLink?.hover ||
        inube.color.surface.navLink.hover
      : theme.color?.surface?.navLink?.regular ||
        inube.color.surface.navLink.regular};
`;

export { StyledCollapseIcon, StyledSectionContainer };
