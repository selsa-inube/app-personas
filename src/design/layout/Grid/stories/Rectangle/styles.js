import styled from "styled-components";

import { inube } from "../../../../tokens/";

const StyledRectangle = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background-color: ${inube.color.surface.primary.regular};
  border-radius: 8px;
`;

export { StyledRectangle };
