const appearance = [
  "primary",
  "success",
  "error",
  "warning",
  "help",
  "dark",
  "gray",
  "light",
];

const props = {
  label: {
    description: "Controls the text that the tag will display",
  },
  appearance: {
    control: "select",
    options: appearance,
    description: "Controls the background color of the tag",
  },
};

export { props, appearance };
