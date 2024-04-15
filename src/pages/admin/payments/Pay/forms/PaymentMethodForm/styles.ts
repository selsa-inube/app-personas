import { inube } from "@design/tokens";
import styled from "styled-components";

interface IStyledLabelPaymentMethod {
  cursorPointer?: boolean;
}

const StyledLabelPaymentMethod = styled.div<IStyledLabelPaymentMethod>`
  display: flex;
  justify-content: space-between;
  border-radius: ${inube.spacing.s100};
  padding: ${inube.spacing.s100};
  background-color: ${({ theme }) =>
    theme.color.surface.gray.clear || inube.color.surface.gray.clear};
  align-items: center;
  cursor: ${({ cursorPointer }) => (cursorPointer ? "pointer" : "default")};
`;

export { StyledLabelPaymentMethod };
