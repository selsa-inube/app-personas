import { inube } from "@design/tokens";
import styled from "styled-components";

const StyledCard = styled.div`
  padding: ${inube.spacing.s200};
  background-color: ${({ theme }) =>
    theme.color?.surface?.gray.clear || inube.color.surface.gray.clear};
  gap: ${inube.spacing.s100};
  display: flex;
  flex-direction: column;
`;

export { StyledCard };
