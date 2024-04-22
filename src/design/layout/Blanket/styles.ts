import { inube } from "@design/tokens";
import styled from "styled-components";

interface IStyledBlanket {
  smallScreen: boolean;
}

const StyledBlanket = styled.div<IStyledBlanket>`
  position: fixed;
  display: grid;
  place-items: ${(props) => (props.smallScreen ? "center" : "initial")};
  inset: 0;
  background-color: ${({ theme }) =>
    theme.color?.surface?.blanket?.regular ||
    inube.color.surface.blanket.regular};
  border: none;
  z-index: 3;
  overflow-y: auto;
`;

export { StyledBlanket };