import { inube } from "@design/tokens";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLinkPolicy = styled(Link)`
  color: ${({ theme }) =>
    theme.color?.text?.link?.regular || inube.color.text.link.regular};

  &:hover {
    color: ${({ theme }) =>
      theme.color?.text?.link?.hover || inube.color.text.link.hover};
  }
`;

export { StyledLinkPolicy };
