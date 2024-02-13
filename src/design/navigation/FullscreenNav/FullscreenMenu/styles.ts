import { inube } from "@design/tokens";
import styled from "styled-components";

const StyledFullscreenNav = styled.nav`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: ${({ theme }) =>
    theme.color?.surface?.nav?.regular || inube.color.surface.nav.regular};
  -webkit-overflow-scrolling: touch;
`;

const StyledCloseMenu = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  padding: ${inube.spacing.s400} ${inube.spacing.s300} ${inube.spacing.s200};

  & > svg {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
`;

const StyledSeparatorLine = styled.hr`
  width: calc(100% - 32px);
  margin: ${inube.spacing.s100} ${inube.spacing.s250};
  background-color: ${({ theme }) =>
    theme.color?.stroke?.divider?.regular ||
    inube.color.stroke.divider.regular};
`;

const StyledFooter = styled.footer`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: ${inube.spacing.s300};
`;

export {
  StyledCloseMenu,
  StyledFooter,
  StyledFullscreenNav,
  StyledSeparatorLine,
};
