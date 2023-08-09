const props = {
  title: {
    description: "Controls the title of the box",
  },
  subtitle: {
    description: "Controls the subtitle of the box",
  },
  children: {
    description:
      "Controls whatever should be rendered inside the box (cards, grids, data).",
  },
  button: {
    description:
      "Controls if there should be a button in the bottom-right part and some attributes. This includes the button label, an icon and the path where to redirect the user when the button is clicked. The styles of the buttons are defined inside the Box.",
  },
  collapsing: {
    description:
      "Controls if the Box can be collapsable or not. This is an object with two boolean properties: the allow property to indicate if the Box is collapsable, and the start property to control if the first render of the Box is collapsed or expanded.",
  },
  icon: {
    description:
      "Controls the icon component that will be displayed on top of the box.",
  },
  navigateTo: {
    description:
      "Controls the path where to redirect the user when the Box is clicked.",
  },
};

export { props };
