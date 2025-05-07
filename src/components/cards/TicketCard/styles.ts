import { inube } from "@design/tokens";
import styled from "styled-components";

interface IStyledTitle {
  $isMobile: boolean;
}

const StyledTitle = styled.div<IStyledTitle>`
  padding: ${inube.spacing.s075} ${({ $isMobile }) => ($isMobile ? inube.spacing.s150 : inube.spacing.s250)};
  background-color: ${({ theme }) =>
    theme.color?.stroke?.divider.regular || inube.color.stroke.divider.regular};
  display: flex;
  align-items: center;
`;

export { StyledTitle };

