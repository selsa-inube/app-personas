import { inube } from "@design/tokens";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface IStyledProduct {
  $empty?: boolean;
}

const StyledProduct = styled(Link)<IStyledProduct>`
  text-decoration: none;
  padding: ${inube.spacing.s100};
  border-radius: 8px;
  background-color: ${({ theme }) =>
    theme.color?.surface?.gray?.clear || inube.color.surface.gray.clear};

  display: block;
  cursor: ${({ $empty }) => (!$empty ? "pointer" : "auto")};
  &:hover {
    background-color: ${({ theme, $empty }) => {
      if (!$empty) {
        return (
          theme.color?.surface?.gray?.hover || inube.color.surface.gray.hover
        );
      }
    }};
  }
`;

interface IStyledSkeletonContainer {
  $isMobile: boolean;
}

const StyledSkeletonContainer = styled.div<IStyledSkeletonContainer>`
  width: 100%;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: ${({ $isMobile }) =>
    $isMobile
      ? "repeat(auto-fill, minmax(100%, 1fr))"
      : "repeat(auto-fill, minmax(100px, 1fr))"};
  direction: rtl;
  gap: ${inube.spacing.s300};
`;

export { StyledProduct, StyledSkeletonContainer };
