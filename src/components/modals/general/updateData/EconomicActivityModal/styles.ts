import { inube } from "@design/tokens";
import styled from "styled-components";

interface IStyledModal {
  $smallScreen: boolean;
}

const StyledModal = styled.div<IStyledModal>`
  display: flex;
  flex-direction: column;
  width: ${({ $smallScreen }) => ($smallScreen ? "100%" : "402px")};
  padding: ${({ $smallScreen }) =>
    $smallScreen ? inube.spacing.s200 : inube.spacing.s300};
  margin: ${inube.spacing.s200} ${inube.spacing.s300};
  gap: ${({ $smallScreen }) =>
    $smallScreen ? inube.spacing.s200 : inube.spacing.s250};
  border-radius: ${inube.spacing.s200};
  background-color: ${({ theme }) =>
    theme.color?.surface?.light?.clear || inube.color.surface.light.clear};
`;

const StyledItem = styled.div`
  cursor: pointer;
  height: 104px;
  padding: ${inube.spacing.s150};
  background-color: ${({ theme }) =>
    theme.color?.surface?.light?.regular || inube.color.surface.light.regular};
  border-radius: ${inube.spacing.s100};
  box-shadow:
    0px 1px 3px 1px rgba(0, 0, 0, 0.15),
    0px 1px 2px 0px rgba(0, 0, 0, 0.3);
`;

const StyledBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${inube.spacing.s150};
  padding: ${inube.spacing.s050};

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) =>
      theme.color?.surface?.dark?.clear || inube.color.surface.dark.clear};
  }
`;

export { StyledBody, StyledItem, StyledModal };
