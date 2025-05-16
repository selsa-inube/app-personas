import { inube } from "@design/tokens";
import styled from "styled-components";

interface IStyledContainerCard {
  $height: string;
  $borderRadius?: string;
}

const StyledContainerCard = styled.div<IStyledContainerCard>`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  border: 1px solid
    ${({ theme }) =>
      theme?.color?.stroke?.divider?.regular ||
      inube.color.stroke.divider.regular};
  border-radius: ${inube.spacing.s100};
  height: ${({ $height }) => $height};
  overflow: hidden;
`;

export { StyledContainerCard };
