import PropTypes from "prop-types";

import { Text } from "../Text";

import { appearance } from "./props";

import { StyledTag } from "./styles";

const darkTextAppearances = ["warning", "gray", "light"];

function Tag(props) {
  const { label, appearance = "gray" } = props;

  return (
    <StyledTag appearance={appearance}>
      <Text
        type="label"
        size="small"
        appearance={darkTextAppearances.includes(appearance) ? "dark" : "light"}
      >
        {label}
      </Text>
    </StyledTag>
  );
}

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  appearance: PropTypes.oneOf(appearance),
};

export { Tag };
