import { inube } from "@design/tokens";
import styled from "styled-components";

const StyledLoadingBeneficiary = styled.div`
  display: flex;
  padding: ${inube.spacing.s100} ${inube.spacing.s150};
  gap: ${inube.spacing.s100};
  background-color: ${({ theme }) =>
    theme?.color?.surface?.gray?.clear || inube.color.surface.gray.clear};
  border-radius: ${inube.spacing.s100};
`;

export { StyledLoadingBeneficiary };
