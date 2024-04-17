import styled from "styled-components";
import { inube } from "../../tokens";

const StyledPage = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100vh;
  overflow: hidden;
`;

const StyledMain = styled.main`
  box-sizing: border-box;
  height: inherit;
  padding: ${inube.spacing.s400} ${inube.spacing.s800};
  overflow-y: scroll;

  @media screen and (max-width: 560px) {
    padding: ${inube.spacing.s300};
  }
`;

export { StyledMain, StyledPage };
