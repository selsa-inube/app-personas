const appearances = [
  "primary",
  "success",
  "warning",
  "danger",
  "help",
  "dark",
  "gray",
  "light",
];

const parameters = {
  docs: {
    description: {
      component:
        "It is a component that facilitates the selection and management of different modes of operation, allowing crucial decisions to be made safely.",
    },
  },
};

const props = {
  title: {
    description: "Corresponds to the title of the decision modal.",
  },
  description: {
    description: "Corresponds to the description of the decision modal.",
  },
  actionText: {
    description:
      "Corresponds to the text to be displayed on the button that will execute the action.",
  },
  portalId: {
    description:
      "The ID of the HTML node where the modal will be rendered using createPortal. This node must be defined in the DOM before using this component.",
  },
  appearance: {
    control: "select",
    options: appearances,
    description:
      "Corresponds to the appearance that the action execution button will take.",
  },
  loading: {
    description:
      "Controls if you want the button running the action to have a spinner at timeout.",
  },
};

export { parameters, props };
