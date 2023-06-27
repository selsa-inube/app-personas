import styled from "styled-components";
import { inube } from "../../tokens";

const StyledAvatar = styled.figure`
  background-color: ${({ theme }) =>
    theme.color?.surface?.primary?.regular ||
    inube.color.surface.primary.regular};
  color: ${inube.color.text.light.regular};
  border-radius: 50%;
  width: 32px;
  height: 32px;

  &:hover {
    background-color: ${({ theme }) =>
      theme.color?.surface?.primary?.hover ||
      inube.color.surface.primary.hover};
  }
`;

export { StyledAvatar };
