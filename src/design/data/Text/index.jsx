import PropTypes from "prop-types";
import { StyledText } from "./styles";

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

const as = ["p", "label", "h1", "h2", "h3", "h4", "h5", "h6", "span"];
const textAlign = ["start", "end", "center", "justify"];

Text.propTypes = {
  children: PropTypes.node.isRequired,
  as: PropTypes.oneOf(as),
  margin: PropTypes.string,
  padding: PropTypes.string,
  color: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.string,
  textAlign: PropTypes.oneOf(textAlign),
};

export { Text };
