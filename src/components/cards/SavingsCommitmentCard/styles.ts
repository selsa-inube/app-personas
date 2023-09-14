import styled from "styled-components";
import { inube } from "@design/tokens";

const StyledCardContainer = styled.div`
  overflow: hidden;
  border-radius: ${inube.spacing.s100};
  outline: 1px solid
    ${({ theme }) =>
      theme.color?.stroke?.light?.regular || inube.color.stroke.light.regular};
`;

const StyledCardHeading = styled.div`
  background-color: ${({ theme }) =>
    theme.color?.surface?.light?.regular || inube.color.surface.light.regular};
`;

const StyledViewContainer = styled.button`
  display: flex;
  align-items: center;
  border: 0;
  cursor: pointer;
  background: none;
  gap: ${inube.spacing.s050};
`;

export { StyledCardContainer, StyledCardHeading, StyledViewContainer };
