import { inube } from "@design/tokens";
import styled from "styled-components";

const StyledContainerCard = styled.div`
  display: flex;
  background: #fff;
  border: 1px solid
    ${({ theme }) =>
      theme?.color?.stroke?.divider?.regular ||
      inube.color.stroke.divider.regular};
  border-radius: ${inube.spacing.s100};
`;

export { StyledContainerCard };
