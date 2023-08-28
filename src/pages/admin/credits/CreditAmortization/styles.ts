import { inube } from "@design/tokens";
import styled from "styled-components";

const StyledAmortizationContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${inube.spacing.s300};
  align-items: center;

  > div {
    width: 100%;
  }
`;

const StyledIconView = styled.div`
  > svg:hover {
    cursor: pointer;
    color: ${({ theme }) =>
      theme.color?.text?.primary?.hover || inube.color.text.primary.hover};
  }
`;

export { StyledIconView, StyledAmortizationContainer };
