import styled from "styled-components";
import { Link } from "react-router-dom";
import { IBreadcrumbLinkProps } from "./index";
import { inube } from "@design/tokens";

const StyledContainerLink = styled.li`
  display: inline-block;
`;

const StyledBreadcrumbLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) =>
    (props: { [x: string]: IBreadcrumbLinkProps }) =>
      props["data-is-active"]
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
