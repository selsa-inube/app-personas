import { AppearanceType, SizeType } from "@ptypes/design.types";
import { StyledSpinner } from "./styles";

interface SpinnerProps {
  appearance?: AppearanceType;
  size?: SizeType;
  track?: boolean;
}

function Spinner(props: SpinnerProps) {
  const { appearance = "primary", size = "small", track = true } = props;

  return <StyledSpinner appearance={appearance} size={size} track={track} />;
}

export { Spinner };
export type { SpinnerProps };