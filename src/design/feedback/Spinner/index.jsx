import PropTypes from "prop-types";

import { StyledSpinner } from "./styles";
import { appearance, size } from "./props";

function Spinner(props) {
  const { appearance = "primary", size = "small", track = true } = props;

  return <StyledSpinner appearance={appearance} size={size} track={track} />;
}

Spinner.propTypes = {
  appearance: PropTypes.oneOf(appearance),
  size: PropTypes.oneOf(size),
  track: PropTypes.bool,
};

export { Spinner };
