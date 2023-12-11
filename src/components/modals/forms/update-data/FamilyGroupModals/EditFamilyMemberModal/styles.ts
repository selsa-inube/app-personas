import { inube } from "@design/tokens";
import styled from "styled-components";

interface IStyledModal {
  smallScreen: boolean;
}

const StyledModal = styled.div<IStyledModal>`
  display: flex;
  width: ${({ smallScreen }) => (smallScreen ? "100%" : "450px")};
  padding: ${({ smallScreen }) =>
    smallScreen ? inube.spacing.s200 : inube.spacing.s300};
  margin: ${inube.spacing.s200} ${inube.spacing.s300};
  flex-direction: column;
  gap: ${({ smallScreen }) =>
    smallScreen ? inube.spacing.s200 : inube.spacing.s250};
  align-items: flex-end;
  border-radius: ${inube.spacing.s200};
  background-color: ${({ theme }) =>
    theme.color?.surface?.light?.clear || inube.color.surface.light.clear};
`;

const StyledDivider = styled.hr<IStyledDivider>`
  margin: 0;
  width: 100%;
  height: 0px;
  border: none;
  border-top: 0.5px ${({ dashed }) => (dashed ? "dashed" : "solid")};
  border-top-color: ${({ theme }) =>
    theme.color?.stroke?.divider?.regular ||
    inube.color.stroke.divider.regular};
`;

interface IStyledDivider {
  dashed?: boolean;
}

export { StyledDivider, StyledModal };
