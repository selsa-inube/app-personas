import { Stack } from "..";
import { Square } from "./Square";

const story = {
  title: "design/layout/Stack",
  components: [Stack],
};

function Squares() {
  return new Array(10).fill(null);
}

export const Row = () => (
  <Stack gap="8px">
    {Squares().map((square, index) => (
      <Square key={index} />
    ))}
  </Stack>
);

export default story;
