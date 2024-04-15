import { inube } from "@design/tokens";
import styled from "styled-components";

const StyledLabelPaymentMethod = styled.div`
  display: flex;
  gap: ${inube.spacing.s100};
  border-radius: ${inube.spacing.s100};
  padding: ${inube.spacing.s100};
  background-color: ${({ theme }) =>
    theme.color.surface.gray.clear || inube.color.surface.gray.clear};
`;

export { StyledLabelPaymentMethod };
