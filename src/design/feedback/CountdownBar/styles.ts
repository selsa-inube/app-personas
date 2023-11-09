import styled from "styled-components";
import { keyframes } from "styled-components";
import { inube } from "@design/tokens";
import { CountdownBarAppearanceType } from "./types";

interface IStyledCountdownBar {
  height: string;
  duration: number;
  paused: boolean;
  appearance: CountdownBarAppearanceType;
}

const CountdownBarAnimation = keyframes`
  0% {
    transform: scaleX(1);
  }
  100% {
    transform: scaleX(0);
  }
`;

const StyledCountdownBar = styled.div<IStyledCountdownBar>`
  width: 100%;
  height: ${(props) => props.height};
  transform-origin: left;
  animation: ${CountdownBarAnimation} ${(props) => props.duration}ms linear;
  background-color: ${({ theme, appearance }) => {
    return (
      theme?.color?.stroke?.[appearance!]?.regular ||
      inube.color.stroke[appearance!].regular
    );
  }};
  animation-fill-mode: forwards;
  animation-play-state: ${(props) => (props.paused ? "paused" : "running")};
`;

export { StyledCountdownBar };
