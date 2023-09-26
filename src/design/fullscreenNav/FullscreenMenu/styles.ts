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
  z-index: 1;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: ${({ theme }) =>
    theme.color?.surface?.light?.clear || inube.color.surface.light.clear};
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

const StyledSeparatorLine = styled.div`
  width: calc(100% - 32px);
  margin: ${inube.spacing.s100} ${inube.spacing.s250};
  height: 1px;
  background-color: ${({ theme }) =>
    theme.color?.surface?.light?.clear || inube.color.surface.light.clear};
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
  StyledFullscreenNav,
  StyledCloseMenu,
  StyledSeparatorLine,
  StyledFooter,
};
