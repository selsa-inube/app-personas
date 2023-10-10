const parameters = {
  docs: {
    description: {
      component:
        "This component helps us to be able to separate content and title it.",
    },
  },
};

const props = {
  title: {
    description:
      "A string that represents the title or heading for the fieldset component.",
  },

  children: {
    description:
      "A prop that expects React nodes as its value, used to render the content inside the fieldset.",
  },
};

export { props, parameters };
