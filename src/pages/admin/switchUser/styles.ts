import { inube } from "@design/tokens";
import styled from "styled-components";

interface IStyledContainer {
  isTablet: boolean;
  isMobile: boolean;
}

const StyledContainer = styled.div<IStyledContainer>`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: ${({ isMobile, isTablet }) =>
    isMobile ? "312px" : isTablet ? "616px" : "744px"};
  gap: ${({ isMobile }) =>
    isMobile ? `${inube.spacing.s300}` : `${inube.spacing.s600}`};
  padding: ${({ isTablet }) =>
    isTablet
      ? `${inube.spacing.s300} ${inube.spacing.s0}`
      : `68px ${inube.spacing.s800} 100px`};
`;

const StyledResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${inube.spacing.s400};
`;

export { StyledContainer, StyledResultContainer };
