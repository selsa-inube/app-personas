const parameters = {
  docs: {
    description: {
      component:
        "This special card component will help us consult the commitments.",
    },
  },
};

const props = {
  title: {
    description:
      "This property is used to display a title on the card, such as a header.",
  },

  attributes: {
    description:
      "This is an array of objects. Each object in this array represents an attribute of the savings commitment, The first two attributes in this array are displayed on the card.",
  },

  tag: {
    description:
      "This is an optional property that can be used to display an additional label on the card. If a value is provided for tag, it will be displayed as an error tag on the card.",
  },
};

export { props, parameters };
