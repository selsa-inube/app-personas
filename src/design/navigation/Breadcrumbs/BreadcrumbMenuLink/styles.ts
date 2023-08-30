import styled from "styled-components";
import { Link } from "react-router-dom";
import { inube } from "@design/tokens";

const StyledContainerLink = styled.li`
  display: inline-block;
  > * {
    padding: ${inube.spacing.s100} ${inube.spacing.s150};
    > label {
      cursor: pointer;
    }
  }

  & p {
    color: ${({ theme }) =>
      theme.color?.text?.gray?.regular || inube.color.text.gray.regular};
      max-width: 136px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
  }
`;

const StyledBreadcrumbMenuLink = styled(Link)`
  text-decoration: none;
`;

export { StyledContainerLink, StyledBreadcrumbMenuLink };
