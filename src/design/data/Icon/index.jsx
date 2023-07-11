import PropTypes from "prop-types";

import { appearance, spacing, variant, shape } from "./props";

import { StyledIcon } from "./styles";

function Icon(props) {
  const {
    icon,
    appearance = "primary",
    spacing = "wide",
    variant,
    disabled = false,
    shape = "rectangle",
    size = "24px",
    allowHover = false,
  } = props;

  return (
    <StyledIcon
      appearance={appearance}
      spacing={spacing}
      variant={variant}
      disabled={disabled}
      shape={shape}
      size={size}
      allowHover={allowHover}
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
  disabled: PropTypes.bool,
  shape: PropTypes.oneOf(shape),
  size: PropTypes.string,
  allowHover: PropTypes.bool,
};

export { Icon };
