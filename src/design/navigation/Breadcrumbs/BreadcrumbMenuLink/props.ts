import { breadcrumbSize } from "../types";

const props = {
  id: {
    control: { type: "text" },
    description: "shall be the id for the text",
  },
  label: {
    control: { type: "text" },
    description: "shall constitute the content to be displayed",
  },
  typo: {
    options: breadcrumbSize,
    control: { type: "select" },
    description: "indicates the font size used in the component",
  },
  path: {
    control: { type: "text" },
    description: "is the path where the BreadcrumbLink is going to navigate",
  },
};

export { props };
