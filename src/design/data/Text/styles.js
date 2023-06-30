import styled from "styled-components";
import { inube } from "../../tokens";

const StyledText = styled.p`
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  color: ${({ color, theme }) =>
    theme.color?.text?.[color]?.regular || inube.color.text[color].regular};

  font-family: ${({ type, size, theme }) =>
    theme.typography?.[type]?.[size]?.font ||
    inube.typography[type][size].font};

  font-size: ${({ type, size, theme }) =>
    theme.typography?.[type]?.[size]?.size ||
    inube.typography[type][size].size};

  font-weight: ${({ type, size, theme }) =>
    theme.typography?.[type]?.[size]?.weight ||
    inube.typography[type][size].weight};

  letter-spacing: ${({ type, size, theme }) =>
    theme.typography?.[type]?.[size]?.tracking ||
    inube.typography[type][size].tracking};

  line-height: ${({ type, size, theme }) =>
    theme.typography?.[type]?.[size]?.lineHeight ||
    inube.typography[type][size].lineHeight};
`;

export { StyledText };
