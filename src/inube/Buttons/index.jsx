import PropTypes from "prop-types";
import { StyledButton } from "./styles";

const Button = (props) => {
  const { label } = props;
  return <StyledButton>{label}</StyledButton>;
};

Button.propTypes = {
  label: PropTypes.string,
};

export { Button };
