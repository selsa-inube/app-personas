import styled from "styled-components";
import { inube } from "../../tokens";

const StyledPage = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100vh;
  overflow: hidden;
`;

const StyledMain = styled.main`
  padding: ${inube.spacing.s400} ${inube.spacing.s800} ${inube.spacing.s800};
  overflow-y: scroll;

  @media screen and (max-width: 560px) {
    padding: ${inube.spacing.s200} ${inube.spacing.s400} ${inube.spacing.s400};
  }

  @media screen and (max-width: 450px) {
    padding: ${inube.spacing.s200} ${inube.spacing.s200} ${inube.spacing.s400};
  }
`;

export { StyledPage, StyledMain };
