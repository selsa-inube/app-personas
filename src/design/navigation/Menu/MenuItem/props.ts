const props = {
  title: {
    description: "A string that represents the title of the menu item.",
  },
  path: {
    description:
      "Corresponds to the path of the menu item where the user will be redirected",
  },
  description: {
    description:
      "An optional string that provides additional information about the menu item.",
  },
  spacing: {
    description:
      "An optional value of type `MenuItemSpacingType` that controls the spacing around the menu item. The default value is `wide`.",
  },
  iconBefore: {
    description:
      "An optional JSX element that represents an icon to be displayed before the title of the menu item.",
  },
  iconAfter: {
    description:
      "An optional JSX element that represents an icon to be displayed after the title of the menu item.",
  },
  disabled: {
    description:
      "An optional boolean that indicates whether the menu item is currently disabled.",
  },
};

export { props };
