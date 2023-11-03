import { inube } from "@design/tokens";
import styled from "styled-components";

const StyledCommitmentsContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: ${inube.spacing.s150};

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export { StyledCommitmentsContainer };
