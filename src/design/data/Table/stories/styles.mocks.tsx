import { inube } from "@design/tokens";
import styled from "styled-components";

const StyledMockActionContainer = styled.div`
  > svg {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }

  & :hover {
    color: ${({ theme }) =>
      theme.color?.text?.dark?.regular || inube.color.text.dark.regular};
  }
`;

export { StyledMockActionContainer };
