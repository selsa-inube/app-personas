import styled from "styled-components";

const StyledStack = styled.div`
  display: flex;
  flex-direction: ${({ direction }) =>
    direction === "row" ? direction : "column"};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  align-content: ${({ alignContent }) => alignContent};
  gap: ${({ gap }) => gap};
  flex-wrap: ${({ wrap }) => wrap};
  height: ${({ height }) => height};
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
`;

export { StyledStack };
