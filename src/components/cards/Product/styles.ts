import { inube } from "@design/tokens";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface IStyledProduct {
  empty?: boolean;
}

const StyledProduct = styled(Link)<IStyledProduct>`
  text-decoration: none;
  padding: ${inube.spacing.s100};
  border-radius: 8px;
  background-color: ${({ theme }) =>
    theme.color?.surface?.gray?.clear || inube.color.surface.gray.clear};

  display: block;
  &:hover {
    cursor: ${({ empty }) => (!empty ? "pointer" : "normal")};
    background-color: ${({ theme, empty }) => {
      if (!empty) {
        return (
          theme.color?.surface?.gray?.hover || inube.color.surface.gray.hover
        );
      }
    }};
  }
`;

export { StyledProduct };
