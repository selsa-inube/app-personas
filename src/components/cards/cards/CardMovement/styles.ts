import { inube } from "@design/tokens";
import styled from "styled-components";

interface IStyledCard {
  smallScreen: boolean;
}

const StyledCard = styled.div<IStyledCard>`
  display: flex;
  flex-direction: column;
  gap: ${({ smallScreen }) =>
    smallScreen ? inube.spacing.s075 : inube.spacing.s100};
`;

export { StyledCard };
