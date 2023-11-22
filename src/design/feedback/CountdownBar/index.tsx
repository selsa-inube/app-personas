import { AnimationEvent } from "react";
import { StyledCountdownBar } from "./styles";
import { CountdownBarAppearanceType } from "./types";
import { inube } from "@design/tokens";

interface ICountdownBarProps {
  height?: string;
  appearance?: CountdownBarAppearanceType;
  duration?: number;
  paused?: boolean;
  onCountdown?: (e: AnimationEvent<HTMLDivElement>) => void;
}

const CountdownBar = ({
  height = inube.spacing.s050,
  appearance = "primary",
  duration = 3000,
  paused = false,
  onCountdown,
}: ICountdownBarProps) => {
  return (
    <StyledCountdownBar
      id="progress-bar"
      appearance={appearance}
      height={height}
      duration={duration}
      paused={paused}
      onAnimationEnd={onCountdown}
    />
  );
};

export { CountdownBar };
export type { ICountdownBarProps };
