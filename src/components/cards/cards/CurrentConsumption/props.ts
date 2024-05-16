const props = {
  isTablet: {
    description: "If the screen is type tablet",
  },
  consumptions: {
    description:
      "Is an array of objects where each object represents some characteristic of the current consumption. Each object has a label and value property.",
  },
  navigateToDetails: {
    description:
      "Is a path to be used by the router to navigate to the detail of current consumption page.",
  },
};

export { props };
