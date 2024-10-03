import { inube } from "@design/tokens";
import styled from "styled-components";

interface IStyledTermsAndConditionsContainer {
  $isMobile: boolean;
}

const StyledTermsAndConditionsContainer = styled.div<IStyledTermsAndConditionsContainer>`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-width: 1px;
  border-style: solid;
  border-radius: ${inube.spacing.s100};
  border-color: ${({ theme }) =>
    theme.color?.stroke?.divider?.regular ||
    inube.color.stroke.divider.regular};
  padding: ${({ $isMobile }) =>
    $isMobile ? inube.spacing.s150 : inube.spacing.s300};
  gap: ${({ $isMobile }) =>
    $isMobile ? inube.spacing.s150 : inube.spacing.s200};
  max-height: ${({ $isMobile }) => ($isMobile ? "311px" : "511px")};
  overflow-y: auto;
  box-sizing: border-box;

  ::-webkit-scrollbar {
    width: ${({ $isMobile }) =>
      $isMobile ? inube.spacing.s050 : inube.spacing.s100};
    border-radius: ${inube.spacing.s100};
    background: ${({ theme }) =>
      theme.color?.surface?.gray?.hover || inube.color.surface.gray.hover};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) =>
      theme.color?.palette?.neutral?.N50 || inube.color.palette.neutral.N50};
    border-radius: ${inube.spacing.s100};
  }
`;

export { StyledTermsAndConditionsContainer };
