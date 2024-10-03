import { inube } from "@design/tokens";
import styled from "styled-components";

interface IStyledUser {
  $onlyAvatar?: boolean;
}

const StyledUser = styled.div<IStyledUser>`
  display: grid;
  grid-template-columns: ${({ $onlyAvatar }) =>
    $onlyAvatar ? "1fr" : "1fr 32px"};
  gap: ${inube.spacing.s200};
  cursor: pointer;

  > figure {
    display: flex;
    width: 32px;
    height: 32px;
    justify-content: center;
    align-items: center;
  }
`;

export { StyledUser };
