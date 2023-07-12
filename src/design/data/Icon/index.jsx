import PropTypes from "prop-types";

import { appearance, spacing, variant, shape } from "./props";

import { StyledIcon } from "./styles";

function Icon(props) {
  const {
    icon,
    appearance = "primary",
    spacing = "wide",
    variant,
    shape = "rectangle",
    size = "24px",
    cursorHover = false,
    parentHover = false,
    disabled = false,
  } = props;

  return (
    <StyledIcon
      appearance={appearance}
      spacing={spacing}
      variant={variant}
      shape={shape}
      size={size}
      cursorHover={cursorHover}
      parentHover={parentHover}
      disabled={disabled}
    >
      {icon}
    </StyledIcon>
  );
}

Icon.propTypes = {
  icon: PropTypes.node.isRequired,
  appearance: PropTypes.oneOf(appearance),
  spacing: PropTypes.oneOf(spacing),
  variant: PropTypes.oneOf(variant),
  shape: PropTypes.oneOf(shape),
  size: PropTypes.string,
  cursorHover: PropTypes.bool,
  parentHover: PropTypes.bool,
  disabled: PropTypes.bool,
};

export { Icon };
