import { inube } from "@design/tokens";
import styled from "styled-components";

const StyledPayments = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${inube.spacing.s200};
  max-height: 300px;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) =>
      theme.color?.surface?.dark?.clear || inube.color.surface.dark.clear};
  }
`;

export { StyledPayments };
