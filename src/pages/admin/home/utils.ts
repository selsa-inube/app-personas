import { investmentsMock } from "@mocks/products/investments/investments.mocks";
import { savingsMock } from "@mocks/products/savings/savings.mocks";
import { EProductType, IAttribute } from "src/model/entity/product";
import { currencyFormat } from "src/utils/currency";
import { extractAttribute } from "src/utils/products";

const getSavingProducts = (types: string[]) => {
  return savingsMock.filter((investment) => types.includes(investment.type));
};

const savingsAccountsMock = getSavingProducts([EProductType.VIEWSAVINGS]);
const savingsContributions = getSavingProducts([
  EProductType.VIEWSAVINGS,
  EProductType.CONTRIBUTIONS,
]);

const getInvestmentsProducts = (userId: string, type: string) => {
  return investmentsMock.filter(
    (investment) => investment.userOwner === userId && investment.type === type,
  );
};

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

export {
  getInvestmentsProducts,
  getSavingsAttributes,
  savingsAccountsMock,
  savingsContributions,
};
