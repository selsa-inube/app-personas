import { inube } from "@design/tokens";
import styled from "styled-components";

interface IStyledModal {
  $isMobile: boolean;
}

const StyledModal = styled.div<IStyledModal>`
  display: flex;
  width: ${({ $isMobile }) => ($isMobile ? "80%" : "450px")};
  padding: ${inube.spacing.s300};
  flex-direction: column;
  gap: ${inube.spacing.s300};

  border-radius: ${inube.spacing.s200};
  background-color: ${({ theme }) =>
    theme.color?.surface?.light?.clear || inube.color.surface.light.clear};
`;

export { StyledModal };
