const props = {
  sections: {
    description:
      "This is an array of objects. Each object represents a section in the menu. It contains a 'title' and an array of 'links'. Each 'link' is an object that represents a menu item. It contains properties like 'title', 'description', 'iconBefore', 'iconAfter', 'disabled', and 'path'.",
  },
  spacing: {
    description:
      "This prop determines the spacing between the menu items. It can be set to 'wide' or 'compact'. The default value is 'wide'.",
  },
  divider: {
    description:
      "This is a boolean prop that determines whether a divider line should be displayed between the sections. The default value is 'false'.",
  },
};

export { props };
