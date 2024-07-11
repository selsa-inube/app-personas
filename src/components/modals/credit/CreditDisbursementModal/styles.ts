import { inube } from "@design/tokens";
import styled from "styled-components";

interface IStyledModal {
  $smallScreen: boolean;
}

const StyledModal = styled.div<IStyledModal>`
  display: flex;
  width: ${({ $smallScreen }) => ($smallScreen ? "312px" : "450px")};
  padding: ${inube.spacing.s300};
  flex-direction: column;
  gap: ${inube.spacing.s250};
  border-radius: ${inube.spacing.s200};
  background-color: ${({ theme }) =>
    theme.color?.surface?.light?.clear || inube.color.surface.light.clear};
`;

const StyledBody = styled.div`
  display: flex;
  padding: ${inube.spacing.s200};
  flex-direction: column;
  gap: ${inube.spacing.s250};
  border-radius: ${inube.spacing.s100};
  border: 1px solid
    ${({ theme }) =>
      theme.color?.stroke?.divider?.regular ||
      inube.color.stroke.divider.regular};
`;

export { StyledBody, StyledModal };
