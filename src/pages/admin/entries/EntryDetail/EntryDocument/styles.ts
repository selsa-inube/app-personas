import { inube } from "@design/tokens";
import styled from "styled-components";

const StyledLogo = styled.img`
  width: 120px;
`;

const StyledEndEntry = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${inube.spacing.s300};
  justify-content: space-between;
  border-left: 6px dashed
    ${({ theme }) =>
      theme.color?.surface?.gray?.regular || inube.color.surface.gray.regular};
`;

export { StyledEndEntry, StyledLogo };
