import { creditMovementTypeDM } from "src/model/domains/credits/creditMovementTypeDM";

const getCreditMovementDescription = (reference: string) => {
  const [, , code] = reference.split("-");

  if (code) {
    return creditMovementTypeDM.valueOf(code.toUpperCase())?.value || "";
  }

  return "";
};

export { getCreditMovementDescription };
