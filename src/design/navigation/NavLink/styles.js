import styled from "styled-components";
import { Link } from "react-router-dom";
import { inube } from "../../tokens";

const StyledNavLink = styled.div`
  height: 40px;
  background-color: ${({ theme, selected }) => {
    if (selected) {
      return (
        theme.color?.surface?.navLink?.selected ||
        inube.color.surface.navLink.selected
      );
    }
    return (
      theme.color?.surface?.navLink?.regular ||
      inube.color.surface.navLink.regular
    );
  }};

  border-left-width: ${({ selected }) => (selected ? "4px" : "0px")};
  border-left-style: solid;
  border-left-color: ${({ theme }) =>
    theme.color?.stroke?.dark?.regular || inube.color.stroke.dark.regular};

  &:hover {
    background-color: ${({ theme }) =>
      theme.color?.surface?.navLink?.hover ||
      inube.color.surface.navLink.hover};
  }
`;

const StyledLink = styled(Link)`
  box-sizing: border-box;
  width: 100%;
  height: inherit;
  display: flex;
  padding: ${({ selected }) => (selected ? "0 16px 0 12px" : "0 16px")};
  text-decoration: none;
  cursor: pointer;
  color: ${({ theme }) =>
    theme.color?.text?.dark?.regular || inube.color.text.dark.regular};
`;

const StyledIcon = styled.div`
  & svg {
    display: block;
    height: 24px;
    width: 24px;
    color: ${({ theme, selected, isHovered }) => {
      if (selected || isHovered) {
        return (
          theme.color?.text?.primary?.regular ||
          inube.color.text.primary.regular
        );
      }
      return theme.color?.text?.dark?.regular || inube.color.text.dark.regular;
    }};
  }

  &:hover svg {
    color: ${({ theme }) =>
      theme.color?.text?.primary?.hover || inube.color.text.primary.hover};
  }
`;

export { StyledNavLink, StyledLink, StyledIcon };
