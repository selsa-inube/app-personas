import { inube } from "@design/tokens";
import styled from "styled-components";

const StyledLogo = styled.img`
  width: 228px;
`;

const StyledHeaderCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${inube.spacing.s150};
  gap: ${inube.spacing.s050};
  background-color: ${({ theme }) =>
    theme?.color?.surface?.light?.clear || inube.color.surface.light.clear};
  border-radius: ${inube.spacing.s100};
  border: 1px solid
    ${({ theme }) =>
      theme?.color?.stroke?.divider?.regular ||
      inube.color.stroke.divider.regular};
`;

const StyledCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${inube.spacing.s150};
  gap: ${inube.spacing.s150};
  background-color: ${({ theme }) =>
    theme?.color?.surface?.light?.clear || inube.color.surface.light.clear};
  border-radius: ${inube.spacing.s100};
  border: 1px solid
    ${({ theme }) =>
      theme?.color?.stroke?.divider?.regular ||
      inube.color.stroke.divider.regular};
`;

export { StyledCardContainer, StyledHeaderCardContainer, StyledLogo };
