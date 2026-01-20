import { inube } from "@design/tokens";
import styled from "styled-components";

interface IStyledCommitmentsContainer {
  $isTablet: boolean;
}

const StyledCommitmentsContainer = styled.div<IStyledCommitmentsContainer>`
  display: flex;
  flex-wrap: ${({ $isTablet }) => ($isTablet ? "nowrap" : "wrap")};
  overflow-x: auto;
  gap: ${inube.spacing.s150};
`;

export { StyledCommitmentsContainer };
