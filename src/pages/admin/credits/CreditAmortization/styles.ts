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

export { StyledAmortizationContainer };
