import styled from "styled-components";
import { inube } from "@design/tokens";

interface IStyledModal {
  smallScreen: boolean;
}

const StyledModal = styled.div<IStyledModal>`
  background-color: ${({ theme }) =>
    theme.color?.surface?.light?.clear || inube.color.surface.light.clear};
  min-width: ${({ smallScreen }) => (smallScreen ? "300px" : "400px")};
  max-width: ${({ smallScreen }) => (smallScreen ? "320px" : "500px")};
  height: auto;
  border-radius: ${inube.spacing.s100};
  margin: ${inube.spacing.s200};
  & > div {
    padding: ${({ smallScreen }) =>
      smallScreen ? inube.spacing.s200 : inube.spacing.s300};
  }
`;

export { StyledModal };
