import { IAttribute } from "@ptypes/pages/product.types";

function extractCommitmentAttribute(
  attributes: IAttribute[],
  attrId: IAttribute["id"]
) {
  return attributes.find((attribute) => attribute.id === attrId);
}

export { extractCommitmentAttribute };
