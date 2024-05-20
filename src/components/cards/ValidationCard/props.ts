const props = {
  label: {
    description: "Label of the validation",
  },
  failDetails: {
    description: "Details of the validation failure",
  },
  value: {
    description: "Value of the validation",
    type: "enum",
    enum: ["fail", "success", "pending"],
  },
};

export { props };
