import { inube } from "@design/tokens";
import styled from "styled-components";

interface IStyledCard {
  smallScreen: boolean;
}

const StyledCard = styled.div<IStyledCard>`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: ${inube.spacing.s100};
  padding: ${({ smallScreen }) =>
    smallScreen ? inube.spacing.s150 : inube.spacing.s200};
  gap: ${({ smallScreen }) =>
    smallScreen ? inube.spacing.s075 : inube.spacing.s100};
  background-color: ${({ theme }) =>
    theme.color?.surface?.gray?.clear || inube.color.surface.gray.clear};
`;

export { StyledCard };
