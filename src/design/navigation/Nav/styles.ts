import styled from "styled-components";
import { inube } from "../../tokens";

const StyledNav = styled.nav`
  height: inherit;
  width: 248px;
  display: grid;
  grid-template-rows: 1fr auto;

  background-color: ${({ theme }) =>
    theme.color?.surface?.nav?.regular || inube.color.surface.nav.regular};
  border-right: 1px solid
    ${({ theme }) =>
      theme.color?.stroke?.divider?.regular ||
      inube.color.stroke.divider.regular};
`;

const StyledContent = styled.section``;

const StyledList = styled.ul`
  list-style: none;
  padding: ${inube.spacing.s0};
`;

const StyledSeparatorLine = styled.div`
  height: 1px;
  padding: 0.5px 0px;
  margin: ${inube.spacing.s100} ${inube.spacing.s200};
  background-color: ${({ theme }) =>
    theme.color?.stroke?.divider?.regular ||
    inube.color.stroke.divider.regular};
`;

const StyledFooter = styled.footer``;

export {
  StyledNav,
  StyledList,
  StyledContent,
  StyledFooter,
  StyledSeparatorLine,
};
