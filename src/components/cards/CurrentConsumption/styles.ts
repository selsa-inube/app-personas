import { inube } from "@design/tokens";
import styled from "styled-components";

const StyledContainer = styled.section`
  gap: ${inube.spacing.s300};
  padding: 0px ${inube.spacing.s200} 0px ${inube.spacing.s200};
  border-width: 1px;
  border-style: solid;
  border-radius: 8px;
  border-color: ${({ theme }) =>
    theme.color?.stroke?.divider?.regular ||
    inube.color.stroke.divider.regular};
`;

export {StyledContainer};
