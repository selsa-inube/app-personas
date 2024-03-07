import { IAttribute } from "src/model/entity/product";
import { currencyFormat } from "src/utils/currency";
import { extractAttribute } from "src/utils/products";

const getSavingsAttributes = (commitmentAttributes: IAttribute[]) => {
  const valueToPay = extractAttribute(commitmentAttributes, "value_to_pay");
  const nextPayDate = extractAttribute(commitmentAttributes, "next_pay_date");

  const currencyValueToPay = valueToPay && {
    id: valueToPay.id || "",
    label: valueToPay.label || "",
    value: currencyFormat(Number(valueToPay.value)),
  };

  const attributes: IAttribute[] = [];
  if (currencyValueToPay) attributes.push(currencyValueToPay);
  if (nextPayDate) attributes.push(nextPayDate);

  return attributes;
};

export { getSavingsAttributes };
