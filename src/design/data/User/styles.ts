import styled from "styled-components";
import { inube } from "@design/tokens";

const StyledUser = styled.div`
  display: grid;
  grid-template-columns: 1fr 32px;
  gap: ${inube.spacing.s200};
  cursor: pointer;

  > figure {
    display: flex;
    width: 32px;
    height: 32px;
    justify-content: center;
    align-items: center;
  }
`;

export { StyledUser };
