import { StyledSpinner } from "./styles";
import { SpinnerAppearanceType, SpinnerSizeType } from "./types";

interface SpinnerProps {
  appearance?: SpinnerAppearanceType;
  size?: SpinnerSizeType;
  track?: boolean;
}

function Spinner(props: SpinnerProps) {
  const { appearance = "primary", size = "small", track = true } = props;

  return <StyledSpinner $appearance={appearance} $size={size} $track={track} />;
}

export { Spinner };
export type { SpinnerProps };
