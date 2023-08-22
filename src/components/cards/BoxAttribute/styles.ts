import { inube } from "@design/tokens";
import styled from "styled-components";

const StyledBoxAttribute = styled.div`
  border-radius: 8px;
  padding: ${inube.spacing.s075} ${inube.spacing.s150};
  width: 100%;
  background-color: ${({ theme }) =>
    theme.color?.surface?.gray.clear || inube.color.surface.gray.clear};
`;

export { StyledBoxAttribute };
