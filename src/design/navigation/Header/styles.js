import styled from "styled-components";
import { inube } from "../../tokens";

const StyledHeader = styled.header`
  margin: 0;
  padding-left: 16px;
  height: 53px;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  box-shadow: 0px 0px 4px 4px
    ${({ theme }) =>
      theme.color?.surface?.gray?.clear || inube.color.surface.gray.clear};
  border-bottom: 1px solid
    ${({ theme }) =>
      theme.color?.stroke?.divider?.regular ||
      inube.color.stroke.divider.regular};
`;

const StyledLogo = styled.img`
  width: 120px;
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

export { StyledHeader, StyledLogo, StyledUser };
