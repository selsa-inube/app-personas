import styled from "styled-components";

import { inube } from "@design/tokens";

interface IStyledTab {
  isDisabled: boolean;
  isSelected: boolean;
}

const StyledTab = styled.li<IStyledTab>`
  width: fit-content;
  user-select: none;
  list-style-type: none;
  border-bottom: ${({ isSelected, isDisabled, theme }) =>
    isSelected &&
    !isDisabled &&
    `4px solid ${
      theme?.color?.stroke?.primary?.regular ||
      inube.color.stroke.primary.regular
    }`};

  & > p {
    cursor: ${({ isDisabled }) => (isDisabled ? "not-allowed" : "pointer")};
  }
`;

export { StyledTab };
