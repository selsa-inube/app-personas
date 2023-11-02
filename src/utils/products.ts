import { IAttribute } from "src/model/entity/product";

const extractAttribute = (
  attributes: IAttribute[],
  attrId: IAttribute["id"]
) => {
  return attributes.find((attribute) => attribute.id === attrId);
};

export { extractAttribute };
