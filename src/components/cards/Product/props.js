const props = {
  title: {
    description: "Controls the name of the product",
  },
  description: {
    description: "Controls a brief description of the product",
  },
  icon: {
    description:
      "Controls the icon that is displayed next to the title and description",
  },
  attributes: {
    description:
      "Is an array of objects where each object represents some characteristic of the product. Each object has a label and value property.",
  },
  tags: {
    description:
      "Is an array of objects where each object is a tag to be displayed next to the product description. Each object has a label and appearance property.",
  },
  empty: {
    description:
      "Controls if there is a product to display or if the user should see that there are no products to be shown.",
  },
};

export { props };
