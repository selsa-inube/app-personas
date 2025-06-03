import styled from "styled-components";
import { inube } from "@design/tokens";

interface IStyledPage {
  $isTablet: boolean;
}

const StyledPage = styled.div<IStyledPage>`
  display: grid;
  grid-template-columns: ${({ $isTablet }) =>
    $isTablet ? "auto 1fr" : "auto"};
  height: 100dvh;
  overflow: hidden;
`;

const StyledNav = styled.div`
  height: 100%;
  z-index: 1;
`;

const StyledMain = styled.main`
  box-sizing: border-box;
  display: flex;
  height: calc(100dvh - 53px);
  justify-content: center;
  align-items: center;
  align-content: center;
  padding: ${inube.spacing.s300};
`;

export { StyledMain, StyledPage, StyledNav };
