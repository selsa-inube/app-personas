import { Grid } from "..";
import { props } from "../props";

import { Rectangle } from "./Rectangle";

const story = {
  title: "design/layout/Grid",
  components: [Grid],
  tags: ["autodocs"],
  argTypes: {
    ...props,
  },
};

function Rectangles(height, width) {
  return new Array(10).fill(<Rectangle height={height} width={width} />);
}

export const Default = (args) => (
  <Grid {...args}>{Rectangles(args.rectangleHeight, args.rectangleWidth)}</Grid>
);
Default.args = {
  children: "",
  templateColumns: "repeat(4, 1fr)",
  templateRows: "",
  gap: "8px",
  justifyItems: "stretch",
  alignItems: "stretch",
  justifyContent: "start",
  alignContent: "start",
  autoColumns: "auto",
  autoRows: "",
  autoFlow: "row",
  rectangleHeight: "80px",
  rectangleWidth: "80px",
};

export default story;
