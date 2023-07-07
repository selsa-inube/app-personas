import PropTypes from "prop-types";

import { StyledSquare } from "./styles";

function Square(props) {
  const { number } = props;
  return <StyledSquare>{number}</StyledSquare>;
}

Square.propTypes = {
  number: PropTypes.number,
};

export { Square };
