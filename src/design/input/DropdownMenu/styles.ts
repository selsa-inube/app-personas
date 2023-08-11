import styled from "styled-components";
import { inube } from "@design/tokens";

const StyledDropdownMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  padding: ${inube.spacing.s050} ${inube.spacing.s0};
  border-radius: ${inube.spacing.s050};

  background: ${({ theme }) =>
    theme.color?.surface?.ligth?.clear || inube.color.surface.light.clear};

  box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.15),
    0px 1px 2px 0px rgba(0, 0, 0, 0.3);
`;

export { StyledDropdownMenu };
