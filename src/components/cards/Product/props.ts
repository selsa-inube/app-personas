const props = {
  id: {
    description: "Id of the product",
  },
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
  breakpoints: {
    description:
      "Is an object where the keys are media queries and the values are the total amount of columns that the card must display for each media query. The first keys must be defined using min-width, going from the greatest breakpoint to the smallest. The last breakpoint should be a max-width breakpoint and we recommend it to be about 10px greater than the previous breakpoint. This avoids the handling of simultaneous events triggering for a single measure.",
  },
  tags: {
    description:
      "Is an array of objects where each object is a tag to be displayed next to the product description. Each object has a label and appearance property.",
  },
  empty: {
    description:
      "Controls if there is a product to display or if the user should see that there are no products to be shown.",
  },
  navigateTo: {
    description:
      "Is a path to be used by the router to navigate to the product page.",
  },
};

export { props };
