const props = {
  children: {
    type: "string",
    description: "Controls the label that is displayed for the link",
  },
  icon: {
    type: "object",
    description: "Controls the icon that is displayed next to the link label",
  },
  path: {
    description: "Controls the URL that the link points to",
  },
  selected: {
    description: "Controls if the link is currently selected",
  },
};

export { props };
