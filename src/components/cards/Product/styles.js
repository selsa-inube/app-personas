import styled from "styled-components";
import { inube } from "../../../design/tokens";

const StyledProduct = styled.article`
  padding: ${inube.spacing.s100};
  border-radius: 8px;
  background-color: ${({ theme }) =>
    theme.color?.surface?.gray?.clear || inube.color.surface.gray.clear};

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
