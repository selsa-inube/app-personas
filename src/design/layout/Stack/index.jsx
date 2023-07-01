import PropTypes from "prop-types";

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
      padding={padding}
      margin={margin}
      wrap={wrap}
    >
      {children}
    </StyledStack>
  );
}

const direction = ["row", "column", "row-reverse", "column-reverse"];
const justifyContent = [
  "flex-start",
  "flex-end",
  "center",
  "space-between",
  "space-around",
  "space-evenly",
  "start",
  "end",
  "left",
  "right",
];
const alignItems = ["flex-start", "flex-end", "center", "stretch", "baseline"];
const alignContent = [
  "normal",
  "flex-start",
  "flex-end",
  "center",
  "stretch",
  "space-between",
  "space-around",
];
const wrap = ["nowrap", "wrap", "wrap-reverse"];

export { Stack };

Stack.propTypes = {
  children: PropTypes.node,
  direction: PropTypes.oneOf(direction),
  justifyContent: PropTypes.oneOf(justifyContent),
  alignItems: PropTypes.oneOf(alignItems),
  alignContent: PropTypes.oneOf(alignContent),
  gap: PropTypes.string,
  height: PropTypes.string,
  padding: PropTypes.string,
  margin: PropTypes.string,
  wrap: PropTypes.oneOf(wrap),
};
