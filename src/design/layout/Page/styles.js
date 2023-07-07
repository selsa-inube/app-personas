import styled from "styled-components";

const StyledPage = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100vh;
  overflow: hidden;
`;

const StyledContent = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
`;

const StyledMain = styled.main`
  padding: 32px 64px 64px;
`;

export { StyledPage, StyledContent, StyledMain };
