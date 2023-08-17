import styled from "styled-components";
import { Link } from "react-router-dom";
import { inube } from "@design/tokens";

const StyledContainerLink = styled.li`
  display: inline-block;
  > * {
    height: ${inube.spacing.s400};
    > label {
      cursor: pointer;
      padding: 8px 12px 8px 12px;
    }
  }

  & p {
    color: ${({ theme }) =>
      theme.color?.text?.gray?.regular || inube.color.text.gray.regular};
  }
`;

const StyledBreadcrumbMenuLink = styled(Link)`
  text-decoration: none;
`;

export { StyledContainerLink, StyledBreadcrumbMenuLink };
