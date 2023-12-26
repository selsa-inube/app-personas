import { Stack, StackProps } from "..";
import { props } from "../props";
import { Square } from "./Square";
import { StoryFn } from "@storybook/react";

const story = {
  title: "design/layout/Stack",
  components: [Stack],
  tags: ["autodocs"],
  argTypes: {
    ...props,
  },
};

function Squares() {
  const squares = [];
  for (let i = 0; i < 10; i++) {
    squares.push(<Square key={i} number={i} />);
  }

  return squares;
}

export const Row: StoryFn<StackProps> = (args) => (
  <Stack {...args}>{args.children}</Stack>
);
Row.args = {
  children: Squares(),
  gap: "8px",
  direction: "row",
  justifyContent: "flex-start",
  alignItems: "stretch",
  alignContent: "normal",
  wrap: "nowrap",
  height: "auto",
  width: "auto",
  padding: "0px",
  margin: "0px",
};

export default story;
