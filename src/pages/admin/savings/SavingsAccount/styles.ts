import { inube } from "@design/tokens";
import styled from "styled-components";

const StyledMovementsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${inube.spacing.s200};
  align-items: flex-end;

  > div {
    width: 100%;
  }
`;

export { StyledMovementsContainer };
