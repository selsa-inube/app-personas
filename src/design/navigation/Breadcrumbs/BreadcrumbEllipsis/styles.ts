import styled from "styled-components";
import { inube } from "@design/tokens";

interface IStyledBreadcrumbEllipsis {
  $cursorHover: boolean;
}

const StyledContainerEllipsis = styled.li`
  display: inline-block;
`;

const StyledBreadcrumbEllipsis = styled.span<IStyledBreadcrumbEllipsis>`
  user-select: none;
  text-decoration: none;
  color: ${({ theme }) =>
    theme.color?.text?.gray?.regular || inube.color.text.gray.regular};
  &:hover {
    cursor: ${({ $cursorHover }) => {
      if ($cursorHover) {
        return "pointer";
      }
    }};
    text-decoration: ${({ $cursorHover }) => {
      if ($cursorHover) {
        return "underline";
      }
    }};
    text-decoration-color: ${({ theme, $cursorHover }) => {
      if ($cursorHover) {
        return (
          theme.color?.stroke?.gray?.hover || inube.color.stroke.gray.hover
        );
      }
    }};
  }
`;

const StyledRelativeContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export {
  StyledContainerEllipsis,
  StyledBreadcrumbEllipsis,
  StyledRelativeContainer,
};
