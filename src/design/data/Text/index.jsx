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
  } = props;
  return (
    <StyledText
      as={as}
      margin={margin}
      padding={padding}
      color={color}
      type={type}
      size={size}
    >
      {children}
    </StyledText>
  );
}

Text.propTypes = {
  children: PropTypes.string,
  as: PropTypes.string,
  margin: PropTypes.string,
  padding: PropTypes.string,
  color: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.string,
};

export { Text };
