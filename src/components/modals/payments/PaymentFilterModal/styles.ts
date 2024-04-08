import { inube } from "@design/tokens";
import styled from "styled-components";

interface IStyledModal {
  smallScreen: boolean;
}

const StyledModal = styled.div<IStyledModal>`
  display: flex;
  width: ${({ smallScreen }) => (smallScreen ? "312px" : "450px")};
  padding: ${inube.spacing.s300};
  flex-direction: column;
  gap: ${inube.spacing.s250};

  border-radius: ${inube.spacing.s200};
  background-color: ${({ theme }) =>
    theme.color?.surface?.light?.clear || inube.color.surface.light.clear};
`;

const StyledApprovedValue = styled.div`
  display: flex;
  align-items: center;
  padding: ${inube.spacing.s150} ${inube.spacing.s200};
  gap: ${inube.spacing.s100};
  border-radius: ${inube.spacing.s100};
  background-color: ${({ theme }) =>
    theme.color?.surface?.success?.clear || inube.color.surface.success.clear};
`;

const StyledOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  padding: ${inube.spacing.s200};
  gap: ${inube.spacing.s200};
  border-radius: ${inube.spacing.s100};
  border: 1px solid
    ${({ theme }) =>
      theme.color?.stroke?.divider?.regular ||
      inube.color.stroke.divider.regular};
`;

const StyledHelpOption = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: ${inube.spacing.s150};
`;

export {
  StyledOptionsContainer,
  StyledHelpOption,
  StyledApprovedValue,
  StyledModal,
};
