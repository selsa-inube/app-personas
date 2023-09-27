const parameters = {
  docs: {
    description: {
      component: "Modal for saving commitments.",
    },
  },
};

const props = {
  portalId: {
    description:
      "The ID of the HTML node where the modal will be rendered using createPortal. This node must be defined in the DOM before using this component",
  },
  products: {
    description:
      "A list of React JSX elements representing products to be displayed in the modal.",
  },
};

export { props, parameters };
