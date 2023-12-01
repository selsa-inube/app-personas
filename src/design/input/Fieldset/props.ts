import { size, type } from "@ptypes/typography.types";

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
  type: {
    control: "select",
    options: type,
    description: "Controls the type of the legend",
  },
  size: {
    control: "select",
    options: size,
    description: "Controls the size of the legend",
  },
};

export { props, parameters };
