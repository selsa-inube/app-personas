import { inube } from "@design/tokens";
import styled from "styled-components";

const StyledTextGrayContainer = styled.div`
  background-color: ${({ theme }) =>
    theme.color?.surface?.gray.clear || inube.color.surface.gray.clear};
  padding: ${inube.spacing.s075} ${inube.spacing.s200};
  border-radius: ${inube.spacing.s100};
`;

export { StyledTextGrayContainer };
