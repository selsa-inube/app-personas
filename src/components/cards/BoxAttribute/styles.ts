import { inube } from "@design/tokens";
import styled from "styled-components";

interface IStyledBoxAttribute {
  smallScreen?: boolean;
}

const StyledBoxAttribute = styled.div<IStyledBoxAttribute>`
  display: flex;
  align-items: center;
  border-radius: 8px;
  padding: ${({ smallScreen }) =>
    smallScreen
      ? inube.spacing.s100
      : `${inube.spacing.s075} ${inube.spacing.s150}`};
  width: auto;
  background-color: ${({ theme }) =>
    theme.color?.surface?.gray.clear || inube.color.surface.gray.clear};
`;

export { StyledBoxAttribute };
