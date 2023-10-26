import styled from "styled-components";
import { inube } from "@design/tokens";

const StyledCardContainer = styled.div`
  min-width: 238px;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  padding: ${inube.spacing.s150};
  border-radius: ${inube.spacing.s050};
  background-color: ${({ theme }) =>
    theme.color?.surface?.gray.clear || inube.color.surface.gray.clear};
  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) =>
      theme.color?.surface?.gray?.hover || inube.color.surface.gray.hover};
  }
`;

export { StyledCardContainer };
