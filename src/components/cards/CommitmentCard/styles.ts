import { inube } from "@design/tokens";
import { Link } from "react-router";
import styled from "styled-components";

const StyledCommitmentCard = styled(Link)`
  text-decoration: none;
  padding: ${inube.spacing.s100};
  border-radius: 8px;
  background-color: ${({ theme }) =>
    theme.color?.surface?.gray?.clear || inube.color.surface.gray.clear};

  display: block;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => {
    return (
      theme.color?.surface?.gray?.hover || inube.color.surface.gray.hover
    );
  }};
  }
`;


export { StyledCommitmentCard };
