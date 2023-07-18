import PropTypes from "prop-types";

import { StyledRectangle } from "./styles";

function Rectangle(props) {
  const { height = "80px", width } = props;
  return <StyledRectangle height={height} width={width} />;
}

Rectangle.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
};

export { Rectangle };
