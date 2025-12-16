import { inube } from "@design/tokens";
import styled from "styled-components";

interface IStyledScroller {
  $smallScreen: boolean;
}

const StyledScroller = styled.div<IStyledScroller>`
  max-height: ${({ $smallScreen }) => ($smallScreen ? "50dvh" : "40dvh")};
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: ${inube.spacing.s200};
  padding: ${inube.spacing.s050};

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) =>
    theme.color?.surface?.dark?.clear || inube.color.surface.dark.clear};
  }
`;

export { StyledScroller };
