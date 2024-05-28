import { inube } from "@design/tokens";
import styled from "styled-components";

interface IStyledCardContainer {
  smallScreen: boolean;
}

const StyledCardContainer = styled.div<IStyledCardContainer>`
  display: flex;
  flex-direction: column;
  width: ${({ smallScreen }) => (smallScreen ? "272px" : "256px")};
  padding: ${inube.spacing.s250};
  background-color: ${({ theme }) =>
    theme?.color?.surface?.light?.clear || inube.color.surface.light.clear};
  border-radius: ${inube.spacing.s100};
  box-shadow: 0px 1px 3px 1px rgba(9, 30, 66, 0.13);
`;

export { StyledCardContainer };
