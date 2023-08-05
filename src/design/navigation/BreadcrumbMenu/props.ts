const props = {
  parameters: {
    docs: {
      description: {
        component:
          "Breadcrumbs are a navigation system used to show a user's location in a site or app.",
      },
    },
  },
  routes: {
    description:
      "The breadcrumb-component will utilize this routes for display, and consequently, it can be employed to locate the source of breadcrumbLinks present within this component.",
    table: {
      defaultValue: {
        summary: `This structure must be present [{
           label: "",
          path: "",
          id: ""}]`,
      },
    },
  },
};

export { props };
