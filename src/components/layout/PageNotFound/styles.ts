import styled from "styled-components";
import { inube } from "@design/tokens";

const StyledPage = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100vh;
  overflow: hidden;
`;

const StyledMain = styled.main`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  height: inherit;
  padding: ${inube.spacing.s300};
`;

export { StyledMain, StyledPage };
