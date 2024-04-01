import { Link } from "react-router-dom";
import styled from "styled-components";
import { inube } from "../../tokens";

const StyledHeader = styled.header`
  margin: 0;
  padding-left: 16px;
  height: 53px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
  box-shadow: 0px 0px 4px 4px
    ${({ theme }) =>
      theme.color?.surface?.gray?.clear || inube.color.surface.gray.clear};
  border-bottom: 1px solid
    ${({ theme }) =>
      theme.color?.stroke?.divider?.regular ||
      inube.color.stroke.divider.regular};
  gap: ${inube.spacing.s500};
`;

const StyledContainer = styled.div`
  display: flex;
  flex-grow: 1;
`;

const StyledLogoContainer = styled(Link)`
  display: flex;
`;

const StyledLogo = styled.img`
  width: 120px;
`;

const StyledLink = styled(Link)`
  display: flex;
  text-decoration: none;
  padding: ${inube.spacing.s200};
`;

const StyledUser = styled.div`
  height: inherit;
  box-sizing: border-box;
  padding: 8px 16px;
  border-left: 1px solid
    ${({ theme }) =>
      theme.color?.stroke?.divider?.regular ||
      inube.color.stroke.divider.regular};
  display: flex;
  align-items: center;
`;

const StyledContainerMenu = styled.div`
  position: absolute;
  top: 48px;
  right: 15px;
`;

export {
  StyledContainer,
  StyledContainerMenu,
  StyledHeader,
  StyledLink,
  StyledLogo,
  StyledLogoContainer,
  StyledUser,
};
