import { inube } from "@design/tokens";
import styled from "styled-components";

const StyledCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${inube.spacing.s250};
  gap: ${inube.spacing.s200};
  justify-content: space-between;
  background-color: ${({ theme }) =>
    theme?.color?.surface?.light?.clear || inube.color.surface.light.clear};
  border-radius: ${inube.spacing.s100};
  box-shadow: 0px 1px 3px 1px rgba(9, 30, 66, 0.13);
`;

export { StyledCardContainer };
