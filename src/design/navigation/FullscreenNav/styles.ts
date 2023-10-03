import { inube } from "@design/tokens";
import styled from "styled-components";

const StyledContDropMenu = styled.div`
  display: flex;
  align-items: center;
  height: 24px;
  
  & > svg {
    width: 24px;
    height: 24px;
    padding: ${inube.spacing.s050};
    cursor: pointer;
  }
`;

export { StyledContDropMenu };
