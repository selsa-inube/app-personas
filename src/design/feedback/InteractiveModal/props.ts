const props = {
  portalId: {
    control: { type: "text" },
    description: "the ID of the portal",
  },
  title: {
    control: { type: "text" },
    description: "the title of the interactive modal",
  },
  closeModal: {
    control: { type: "function" },
    description: "callback function to close the interactive modal",
  },
  infoData: {
    control: { type: "object" },
    description: "data containing user information",
  },
  actions: {
    control: { type: "array" },
    description: "actions available for the interactive modal",
  },
  labels: {
    control: { type: "object" },
    description: "custom labels for the interactive modal",
  },
  infoTitle: {
    control: { type: "text" },
    description: "custom title for information that displays in modal",
  },
  actionsTitle: {
    control: { type: "text" },
    description: "custom title for actions that displays in modal",
  },
};

export { props };
