const parameters = {
  docs: {
    description: {
      component:
        "The fullscreenNav is a menu that occupies the entire screen, providing users with a way to navigate through different sections or pages.",
    },
  },
};

const props = {
  logoutPath: {
    description:
      "Corresponds to the path to which it is redirected by pressing the option to exit the page",
  },
  logoutTitle: {
    description:
      "Corresponds to the value shown in the option to exit the page.",
  },
  portalId: {
    description: "Corresponds to the node where FullscreenNav will deploy",
  },
  navigation: {
    description:
      "Corresponds to the options that will be displayed in the FullscreenNav component menu, this option has sections and redirect links.",
  },
  links: {
    description:
      "Corresponds to the links that are in the header, which will appear as a section of it at the time of deploying the FullscreenNav component.Corresponds to the options that will be displayed in the FullscreenNav component menu, this option has sections and redirect links.",
  },
};

export { props, parameters };
