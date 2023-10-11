import { inube } from "@design/tokens";
import styled from "styled-components";

const StyledList = styled.div`
  display: flex;
  padding: ${inube.spacing.s200};
  flex-direction: column;
  gap: ${inube.spacing.s150};

  border-radius: ${inube.spacing.s100};
  border: 1px solid
    ${({ theme }) =>
      theme.color?.stroke?.divider?.regular ||
      inube.color.stroke.divider.regular};
`;

export { StyledList };
