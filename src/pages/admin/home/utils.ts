import { IAttribute } from "src/model/entity/product";
import { currencyFormat } from "src/utils/currency";
import { extractAttribute } from "src/utils/products";

const getCommitmentAttributes = (commitmentAttributes: IAttribute[]) => {
  const valueToPay = extractAttribute(commitmentAttributes, "quota_value");
  const nextPayDate = extractAttribute(commitmentAttributes, "next_payment");
  const commitmentValue = extractAttribute(
    commitmentAttributes,
    "commitment_value",
  );

  const currencyValueToPay = valueToPay && {
    id: valueToPay.id || "",
    label: valueToPay.label || "",
    value: currencyFormat(Number(valueToPay.value)),
  };

  const attributes: IAttribute[] = [];
  if (commitmentValue) attributes.push(commitmentValue);
  if (currencyValueToPay) attributes.push(currencyValueToPay);
  if (nextPayDate) attributes.push(nextPayDate);

  return attributes;
};

export { getCommitmentAttributes };
