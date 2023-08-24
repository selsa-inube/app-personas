import { inube } from "@design/tokens";
import styled from "styled-components";

interface IStyledBoxAttribute {
  smallScreen?: boolean;
}

const StyledBoxAttribute = styled.div<IStyledBoxAttribute>`
  border-radius: 8px;
  padding: ${({ smallScreen }) =>
    smallScreen
      ? inube.spacing.s100
      : `${inube.spacing.s075} ${inube.spacing.s150}`};
  width: ${({ smallScreen }) => (smallScreen ? "auto" : "100%")};
  background-color: ${({ theme }) =>
    theme.color?.surface?.gray.clear || inube.color.surface.gray.clear};
`;

export { StyledBoxAttribute };
