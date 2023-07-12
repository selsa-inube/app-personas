import PropTypes from "prop-types";
import { StyledText } from "./styles";
import { as, appearance, type, size, textAlign } from "./props";

function Text(props) {
  const {
    children,
    as = "p",
    margin = "0px",
    padding = "0px",
    appearance = "dark",
    type = "body",
    size = "large",
    textAlign = "start",
    cursorHover = false,
    parentHover = false,
    disabled = false,
  } = props;
  return (
    <StyledText
      as={as}
      margin={margin}
      padding={padding}
      appearance={appearance}
      type={type}
      size={size}
      textAlign={textAlign}
      cursorHover={cursorHover}
      parentHover={parentHover}
      disabled={disabled}
    >
      {children}
    </StyledText>
  );
}

Text.propTypes = {
  children: PropTypes.node.isRequired,
  as: PropTypes.oneOf(as),
  margin: PropTypes.string,
  padding: PropTypes.string,
  appearance: PropTypes.oneOf(appearance),
  type: PropTypes.oneOf(type),
  size: PropTypes.oneOf(size),
  textAlign: PropTypes.oneOf(textAlign),
  cursorHover: PropTypes.bool,
  parentHover: PropTypes.bool,
  disabled: PropTypes.bool,
};

export { Text };
