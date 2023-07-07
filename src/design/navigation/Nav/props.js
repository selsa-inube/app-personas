const props = {
  title: {
    description: "Controls the label displayed on top of the Nav",
  },
  sections: {
    control: "object",
    description: "Controls the sections and its links inside the Nav",
  },
  currentLocation: {
    type: "string",
    description:
      "Equals the current path, where the user currently is. With this path, the Nav can identify which Navlink should have its selected property turned on when mapping all sections and links.",
  },
};

export { props };
