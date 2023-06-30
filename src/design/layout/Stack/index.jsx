import PropTypes from "prop-types";

import { StyledStack } from "./styles";

function Stack(props) {
  const {
    children,
    direction = "row",
    justifyContent = "flex-start",
    alignItems = "stretch",
    gap = "0px",
    height = "auto",
    padding = "0px",
    margin = "0px",
  } = props;
  return (
    <StyledStack
      direction={direction}
      justifyContent={justifyContent}
      alignItems={alignItems}
      gap={gap}
      height={height}
      padding={padding}
      margin={margin}
    >
      {children}
    </StyledStack>
  );
}

export { Stack };

Stack.propTypes = {
  children: PropTypes.node,
  direction: PropTypes.string,
  justifyContent: PropTypes.string,
  alignItems: PropTypes.string,
  gap: PropTypes.string,
  height: PropTypes.string,
  padding: PropTypes.string,
  margin: PropTypes.string,
};
