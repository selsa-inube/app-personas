import { inube } from "@design/tokens";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLinkPolicy = styled(Link)`
  color: ${({ theme }) =>
    theme.color?.text?.primary?.regular || inube.color.text.primary.regular};

  &:hover {
    color: ${({ theme }) =>
      theme.color?.text?.primary?.hover || inube.color.text.primary.hover};
  }
`;

export { StyledLinkPolicy };
