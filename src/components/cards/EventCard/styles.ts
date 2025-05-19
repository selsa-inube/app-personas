import { inube } from "@design/tokens";
import styled from "styled-components";

interface IStyledDate {
  $isMobile: boolean;
}

const StyledDate = styled.div<IStyledDate>`
  padding: ${({ $isMobile }) =>
    $isMobile
      ? `${inube.spacing.s100} ${inube.spacing.s150}`
      : `0 ${inube.spacing.s200}`};
  background-color: ${({ theme }) =>
    theme.color?.stroke?.divider.regular || inube.color.stroke.divider.regular};
  display: flex;
  justify-content: center;
  align-items: ${({ $isMobile }) => ($isMobile ? "flex-start" : "center")};
  flex-direction: column;
  min-width: ${({ $isMobile }) => ($isMobile ? "76px" : "110px")};
`;

export { StyledDate };
