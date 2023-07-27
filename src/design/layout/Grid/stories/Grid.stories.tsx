import { Grid, GridProps } from "..";
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

interface GridPropsExtends extends GridProps {
  rectangleHeight: string;
  rectangleWidth: string;
}

function Rectangles(height: string, width: string) {
  return new Array(10).fill(<Rectangle height={height} width={width} />);
}

export const Default = (args: GridPropsExtends) => (
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
  margin: "0px",
  padding: "0px",
  height: "auto",
  width: "auto",
};

export default story;
