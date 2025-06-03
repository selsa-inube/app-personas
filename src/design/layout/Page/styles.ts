import styled from "styled-components";
import { inube } from "../../tokens";

interface IStyledPage {
  $isTablet: boolean;
  $withNav: boolean;
}

const StyledPage = styled.div<IStyledPage>`
  display: grid;
  grid-template-columns: ${({ $isTablet, $withNav }) =>
    $withNav && !$isTablet ? "auto 1fr" : "1fr"};
  height: 100vh;
  width: 100%;
  overflow: hidden;
`;

const StyledNav = styled.div`
  height: 100%;
  z-index: 1;
`;

interface IStyledMain {
  $isTablet: boolean;
  $withNav: boolean;
}

const StyledMain = styled.main<IStyledMain>`
  box-sizing: border-box;
  height: calc(100vh - 53px);
  width: 100%;
  padding: ${inube.spacing.s400} ${inube.spacing.s800};
  overflow-y: scroll;

  @media screen and (max-width: 560px) {
    padding: ${inube.spacing.s200};
  }
`;

export { StyledMain, StyledPage, StyledNav };
