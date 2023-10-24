import { inube } from "@design/tokens";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  padding: ${inube.spacing.s200} ${inube.spacing.s250};
  flex-direction: column;
  gap: ${inube.spacing.s200};
  border-radius: 8px;
  border: 1px solid
    ${({ theme }) =>
      theme.color?.stroke?.divider?.regular ||
      inube.color.stroke.divider.regular};
  width: auto;
  box-sizing: border-box;
  align-items: flex-start;
`;

const StyledHead = styled.button`
  outline: none;
  border: none;
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  cursor: pointer;
`;

const StyledIcon = styled.div`
  cursor: pointer;
  width: 20px;
  height: 20px;
`;

export { StyledContainer, StyledHead, StyledIcon };
