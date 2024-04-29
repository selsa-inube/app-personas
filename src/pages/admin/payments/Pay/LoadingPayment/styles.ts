import { inube } from "@design/tokens";
import styled from "styled-components";

const StyledLoadingCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) =>
    theme.color?.surface?.light?.clear || inube.color.surface.light.clear};
  border-radius: ${inube.spacing.s100};
  gap: ${inube.spacing.s300};
  padding: ${inube.spacing.s300};
  max-width: 450px;
`;

export { StyledLoadingCard };
