import styled from "styled-components";
import { Link } from "react-router-dom";
import { inube } from "@design/tokens";

interface IStyledBreadcrumbLink {
  isActive: boolean;
  cursorHover: boolean;
}

const StyledContainerLink = styled.li`
  display: inline-block;
`;

const StyledBreadcrumbLink = styled(Link)<IStyledBreadcrumbLink>`
  text-decoration: none;
  color: ${({ theme, isActive }) =>
    isActive
      ? theme.color?.text?.dark?.regular || inube.color.text.dark.regular
      : theme.color?.text?.gray?.regular || inube.color.text.gray.regular};
  &:hover {
    text-decoration: ${({ cursorHover }) => {
      if (cursorHover) {
        return "underline";
      }
    }};
    text-decoration-color: ${({ theme, cursorHover }) => {
      if (cursorHover) {
        return (
          theme.color?.stroke?.gray?.hover || inube.color.stroke.gray.hover
        );
      }
    }};
  }
`;

export { StyledContainerLink, StyledBreadcrumbLink };
