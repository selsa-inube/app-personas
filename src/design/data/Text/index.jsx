import PropTypes from "prop-types";
import { StyledText } from "./styles";
import { as, color, type, size, textAlign } from "./props";

function Text(props) {
  const {
    children,
    as = "p",
    margin = "0px",
    padding = "0px",
    color = "dark",
    type = "body",
    size = "large",
    textAlign = "start",
  } = props;
  return (
    <StyledText
      as={as}
      margin={margin}
      padding={padding}
      color={color}
      type={type}
      size={size}
      textAlign={textAlign}
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
  color: PropTypes.oneOf(color),
  type: PropTypes.oneOf(type),
  size: PropTypes.oneOf(size),
  textAlign: PropTypes.oneOf(textAlign),
};

export { Text };
