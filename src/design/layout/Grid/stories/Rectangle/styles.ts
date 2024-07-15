import styled from "styled-components";

import { inube } from "../../../../tokens";

interface IStyledRectangle {
  $width?: string;
  $height?: string;
}

const StyledRectangle = styled.div<IStyledRectangle>`
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  background-color: ${inube.color.surface.primary.regular};
  border-radius: 8px;
`;

export { StyledRectangle };
