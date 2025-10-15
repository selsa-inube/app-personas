import { inube } from "@design/tokens";
import styled from "styled-components";

const StyledSimulationResults = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${inube.spacing.s200};
  gap: ${inube.spacing.s100};
  margin: 0;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme?.color?.stroke?.divider?.regular || inube.color.stroke.divider.regular};
  background-color: ${({ theme }) => theme?.color?.surface?.gray?.clear || inube.color.surface.gray.clear};
`;

export { StyledSimulationResults };