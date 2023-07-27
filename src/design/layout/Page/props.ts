const props = {
  header: {
    controls: "object",
    description:
      "Contains the information that will be shared with the Header through props",
  },
  nav: {
    controls: "object",
    description:
      "Contains the information that will be shared with the Nav through props",
  },
  currentLocation: {
    description:
      "Contains the pathname for the current page. This information is passed to the Nav through props so that component get to know where the user is and select (mark) the corresponding link.",
  },
};

export { props };
