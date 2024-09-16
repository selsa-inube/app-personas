import { inube } from "@design/tokens";
import styled from "styled-components";

interface IStyledLoadingCard {
  $isMobile: boolean;
}

const StyledLoadingCard = styled.div<IStyledLoadingCard>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) =>
    theme.color?.surface?.light?.clear || inube.color.surface.light.clear};
  border-radius: ${inube.spacing.s100};
  gap: ${inube.spacing.s250};
  padding: ${inube.spacing.s300};
  max-width: ${({ $isMobile }) => ($isMobile ? "80%" : "450px")};
`;

export { StyledLoadingCard };
