import { inube } from "@design/tokens";
import styled from "styled-components";

const StyledAmortizationContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: ${inube.spacing.s200};
  padding: ${inube.spacing.s200};
  border-radius: ${inube.spacing.s100};
  border: 1px solid
    ${({ theme }) =>
      theme?.color?.stroke?.divider?.regular ||
      inube.color.stroke.divider.regular};
`;

export { StyledAmortizationContainer };
