import  { switchSizes } from "./types";

const parameters = {
  docs: {
    description: {
      component:
        "A switch is used to view or switch between enabled or disabled states.",
    },
  },
};

const props = {
  id: {
    options: ["id"],
    control: { type: "select" },
    description:
      "this element can have a label on it, so this id allows us to connect the label with the switch",
  },
  disabled: {
    options: [true, false],
    control: { type: "boolean" },
    description:
      "if the switch is disabled or not. This prevents any interaction.",
    table: {
      defaultValue: { summary: "false" },
    },
  },
  checked: {
    options: [true, false],
    control: { type: "boolean" },
    description: "",
    table: {
      defaultValue: { summary: false },
    },
  },
  name: {
    options: ["name"],
    control: { type: "select" },
    description:
      "descriptive name for value property to be submitted in a form",
  },
  value: {
    options: ["switchTest1", "switchTest2", "switchTest3", "switchTest4"],
    control: { type: "select" },
    description: "value to be submitted in a form",
  },
  onChange: {
    options: ["logState"],
    control: { type: "func" },
    description:
      "is a function that the component receives and that can be executed every time the switch state is modified",
  },
  sizeSwitch: {
    options: switchSizes,
    control: { type: "select" },
    description: "toggle size",
    table: {
      defaultValue: { summary: "small" },
    },
  },
  label: {
    description: "component text content",
  },
  margin: {
    type: { name: "string", required: false },
    description:
      "Sets the margin in px or global values for all four sides of the component. Accepted values are the spacing tokens",
    table: {
      defaultValue: { summary: "s0" },
    },
  },
  padding: {
    type: { name: "string", required: false },
    description:
      "Sets the padding in px p global values for all four sides of the component. Accepted values are the spacing tokens",
    table: {
      defaultValue: { summary: "s0" },
    },
  },
};

export { props, parameters };