import { inube } from "@design/tokens";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface IStyledTermsAndConditionsContainer {
  $isMobile: boolean;
}

const StyledTermsAndConditionsContainer = styled.div<IStyledTermsAndConditionsContainer>`
  height: ${({ $isMobile }) => ($isMobile ? "311px" : "511px")};
  overflow-y: auto;

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

interface IStyledTermsAndConditionsInfo {
  $isMobile: boolean;
}

const StyledTermsAndConditionsInfo = styled.div<IStyledTermsAndConditionsInfo>`
  display: flex;
  flex-direction: column;
  border-width: 1px;
  border-style: solid;
  border-radius: ${inube.spacing.s100};
  border-color: ${({ theme }) =>
    theme.color?.stroke?.divider?.regular ||
    inube.color.stroke.divider.regular};
  margin-right: ${({ $isMobile }) =>
    $isMobile ? inube.spacing.s100 : inube.spacing.s200};
  padding: ${({ $isMobile }) =>
    $isMobile ? inube.spacing.s150 : inube.spacing.s300};
  gap: ${({ $isMobile }) =>
    $isMobile ? inube.spacing.s150 : inube.spacing.s200};
`;

const StyledLinkPolicy = styled(Link)`
  color: ${({ theme }) =>
    theme.color?.text?.link?.regular || inube.color.text.link.regular};

  &:hover {
    color: ${({ theme }) =>
      theme.color?.text?.link?.hover || inube.color.text.link.hover};
  }
`;

export {
  StyledLinkPolicy,
  StyledTermsAndConditionsContainer,
  StyledTermsAndConditionsInfo,
};
