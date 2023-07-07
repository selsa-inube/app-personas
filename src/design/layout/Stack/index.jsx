import PropTypes from "prop-types";
import {
  direction,
  justifyContent,
  alignItems,
  alignContent,
  wrap,
} from "./props";

import { StyledStack } from "./styles";

function Stack(props) {
  const {
    children,
    direction = "row",
    justifyContent = "flex-start",
    alignItems = "stretch",
    alignContent = "normal",
    gap = "0px",
    height = "auto",
    width = "auto",
    padding = "0px",
    margin = "0px",
    wrap = "nowrap",
  } = props;
  return (
    <StyledStack
      direction={direction}
      justifyContent={justifyContent}
      alignItems={alignItems}
      alignContent={alignContent}
      gap={gap}
      height={height}
      width={width}
      padding={padding}
      margin={margin}
      wrap={wrap}
    >
      {children}
    </StyledStack>
  );
}

export { Stack };

Stack.propTypes = {
  children: PropTypes.node,
  direction: PropTypes.oneOf(direction),
  justifyContent: PropTypes.oneOf(justifyContent),
  alignItems: PropTypes.oneOf(alignItems),
  alignContent: PropTypes.oneOf(alignContent),
  gap: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  padding: PropTypes.string,
  margin: PropTypes.string,
  wrap: PropTypes.oneOf(wrap),
};
