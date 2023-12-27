import styled from "styled-components";
import { inube } from "@design/tokens";

const StyledTabs = styled.div`
  box-sizing: border-box;
  overflow-x: auto;
  white-space: nowrap;
  width: 100%;
  border-bottom: 2px solid
    ${({ theme }) =>
      theme?.color?.stroke?.divider?.regular ||
      inube.color.stroke.divider.regular};
  padding: ${inube.spacing.s0} ${inube.spacing.s200};
`;

export { StyledTabs };
