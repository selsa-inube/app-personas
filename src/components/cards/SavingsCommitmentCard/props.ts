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
  value: {
    description:
      "This property represents a numeric value and is used to display information related to the savings commitment value. The value is formatted as a currency amount using the currencyFormat function before displaying it on the card.",
  },
  label: {
    description:
      "This property is also a string and is used to display a label that accompanies the savings commitment value. It can be a brief description or a label that clarifies the meaning of the value.",
  },
  tagValue: {
    description:
      "This is an optional property that can be used to display an additional label on the card. If a value is provided for tagValue, it will be displayed as an error tag on the card.",
  },
  description: {
    description:
      "This property is a string used to display a brief description on the card. It can be a description of the savings commitment or some other relevant detail.",
  },
  descriptionValue: {
    description:
      "Similar to description, this property is a string and is used to display information related to the description. It can be a specific amount or additional details related to the description.",
  },
};

export { props, parameters };
