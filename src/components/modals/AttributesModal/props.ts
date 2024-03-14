const props = {
  title: {
    description: "The title of the modal displayed at the top.",
  },
  description: {
    description: "An description displayed below the title",
  },
  portalId: {
    description:
      "The ID of the HTML node where the modal will be rendered using createPortal. This node must be defined in the DOM before using this component.",
  },
  attributes: {
    description:
      "A list of attributes to be displayed in the modal. Each attribute object should have a label (tag) property and a value property.",
  },
};

export { props };
