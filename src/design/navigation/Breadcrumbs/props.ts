export const sizes = ["large", "small"] as const;
export type Sizes = (typeof sizes)[number];

const props = {
  crumbs: {
    description:
      "An array of objects that contain the path, label, id, and isActive properties.",
  },
};

export { props };
