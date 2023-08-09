import styled from "styled-components";

const StyledBreadcrumbs = styled.ul`
  padding: 0;
  margin: 0;
  & > li:not(:last-child)::after,
  & > div:not(:last-child)::after {
    pointer-events: none;
    content: "/";
    margin: 0 8px;
  }
  & li > p {
    display: inherit;
  }
`;

export { StyledBreadcrumbs };
