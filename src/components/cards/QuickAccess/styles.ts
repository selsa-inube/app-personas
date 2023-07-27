import { Link } from "react-router-dom";
import styled from "styled-components";

import { inube } from "@design/tokens";

const StyledQuickAccess = styled.aside`
  width: 100%;
`;

const StyledContainer = styled.div`
  padding: 8px 0px;

  border-width: 1px;
  border-style: solid;
  border-radius: 8px;
  border-color: ${({ theme }) =>
    theme.color?.stroke?.divider?.regular ||
    inube.color.stroke.divider.regular};
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) =>
    theme.color?.text?.dark?.regular || inube.color.text.dark.regular};

  & :hover {
    background-color: ${({ theme }) =>
      theme.color?.surface?.gray?.clear || inube.color.surface.gray.clear};
  }
`;

export { StyledQuickAccess, StyledContainer, StyledLink };
