import styled from "styled-components";
import { inube } from "@design/tokens";

const StyledBreadcrumbs = styled.ul`
  padding: 0;
  margin: 0;
  & > li:not(:last-child)::after,
  & > div:not(:last-child)::after {
    pointer-events: none;
    content: "/";
    margin: 0 8px;
    color: ${({ theme }) =>
      theme.color?.text?.gray?.regular || inube.color.text.gray.regular};
  }
  & li > p {
    display: inherit;
  }
`;

export { StyledBreadcrumbs };
