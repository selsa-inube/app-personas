import { inube } from "@design/tokens";
import styled from "styled-components";

const StyledStickyContainer = styled.div`
  position: sticky;
  top: 0;
  align-self: start;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${inube.spacing.s250};
  gap: ${inube.spacing.s250};

  border-width: 1px;
  border-style: solid;
  border-radius: 8px;
  border-color: ${({ theme }) =>
    theme.color?.stroke?.divider?.regular ||
    inube.color.stroke.divider.regular};
`;

export { StyledContainer, StyledStickyContainer };
