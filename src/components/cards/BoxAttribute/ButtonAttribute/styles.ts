import { inube } from "@design/tokens";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0px ${inube.spacing.s050} 0px ${inube.spacing.s025};
  gap: ${inube.spacing.s100};
  border-radius: ${inube.spacing.s050};
  background-color: ${({ theme }) =>
    theme.color?.surface?.gray?.regular || inube.color.surface.gray.regular};
  cursor: pointer;
`;

const StyledIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${inube.spacing.s025};
`;

export { StyledContainer, StyledIcon };
