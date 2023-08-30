import styled from "styled-components";
import { inube } from "@design/tokens";

const StyledBreadcrumbMenu = styled.div`
  position: absolute;
  width: fit-content;
  min-width: 100px;
  max-width: 160px;
  overflow: hidden;
  box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.15),
    0px 1px 2px 0px rgba(0, 0, 0, 0.3);
  background-color: ${({ theme }) =>
    theme.color?.surface?.light?.clear || inube.color.surface.light.clear};
  border-radius: ${inube.spacing.s050};
  a {
    &:hover {
      cursor: pointer;
      background-color: ${({ theme }) =>
        theme.color?.surface?.gray?.hover || inube.color.surface.gray.hover};
    }
  }
`;

export { StyledBreadcrumbMenu };
