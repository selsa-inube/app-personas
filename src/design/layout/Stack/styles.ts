import styled from "styled-components";
import {
  AlignContentType,
  DirectionType,
  JustifyContentType,
  WrapType,
} from "./types";

interface IStyledStack {
  direction?: DirectionType;
  justifyContent?: JustifyContentType;
  alignItems?: AlignContentType;
  alignContent?: AlignContentType;
  gap?: string;
  height?: string;
  width?: string;
  padding?: string;
  margin?: string;
  wrap?: WrapType;
}

const StyledStack = styled.div<IStyledStack>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  align-content: ${({ alignContent }) => alignContent};
  gap: ${({ gap }) => gap};
  flex-wrap: ${({ wrap }) => wrap};
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
`;

export { StyledStack };
