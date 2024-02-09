import { EProductType, IAttribute } from "src/model/entity/product";
import { formatPrimaryDate } from "src/utils/dates";

const getProductDetails = (
  productTypeCode: EProductType,
  productDescription: string,
  productNumber: string,
) => {
  const details = {
    [EProductType.PERMANENTSAVINGS]: {
      title: productDescription,
      description: `${productDescription} ${productNumber}`,
    },
    [EProductType.CONTRIBUTIONS]: {
      title: productDescription,
      description: `${productDescription} ${productNumber}`,
    },
    [EProductType.CDAT]: {
      title: productDescription.replace(/\bCdat\b/g, "CDAT"),
      description: `CDAT ${productNumber}`,
    },
    [EProductType.VIEWSAVINGS]: {
      title: productDescription,
      description: `${productDescription} ${productNumber}`,
    },
    [EProductType.PROGRAMMEDSAVINGS]: {
      title: productDescription,
      description: `${productDescription} ${productNumber}`,
    },
  };
  return details[productTypeCode] || {};
};

const getProductAttributes = (
  productTypeCode: EProductType,
  saving: Record<string, string | number | object>,
): IAttribute[] => {
  const beneficiaries = Array.isArray(saving.savingBeneficiaries)
    ? saving.savingBeneficiaries.map((beneficiary) => ({
        id: beneficiary.beneficiaryId,
        label: beneficiary.beneficiaryName,
        value: beneficiary.benefitPercentage + " %",
      }))
    : [];

  const creditMovementPesos =
    Array.isArray(saving.accumulatedSavingProducts) &&
    saving.accumulatedSavingProducts.length > 0
      ? Object(saving.accumulatedSavingProducts[0]).creditMovementPesos
      : 0;

  const attributes = {
    [EProductType.PERMANENTSAVINGS]: [
      {
        id: "net_value",
        label: "Saldo total",
        value: Number(saving.balanceSavings),
      },
      {
        id: "beneficiaries",
        label: "Beneficiarios",
        value: beneficiaries,
      },
    ],
    [EProductType.CONTRIBUTIONS]: [
      {
        id: "net_value",
        label: "Saldo total",
        value: Number(creditMovementPesos),
      },
      {
        id: "beneficiaries",
        label: "Beneficiarios",
        value: beneficiaries,
      },
    ],

    [EProductType.CDAT]: [
      {
        id: "title",
        label: "Titulo",
        value: String(saving.productNumber),
      },
      {
        id: "net_value",
        label: "Valor",
        value: Number(saving.balanceSavings),
      },
      {
        id: "expiration_date",
        label: "Fecha de vencimiento",
        value: formatPrimaryDate(new Date(String(saving.expirationDate))),
      },

      {
        id: "interest_rate",
        label: "Tasa de interés",
        value: `${saving.annualEffectiveRate} % EA`,
      },
      {
        id: "deadline_days",
        label: "Plazo en días",
        value: `${saving.savingsTerm} Dias`,
      },
      {
        id: "payment_interest",
        label: "Pago de intereses",
        value: "Periódico",
      },
      {
        id: "beneficiaries",
        label: "Beneficiarios",
        value: beneficiaries,
      },
      {
        id: "request_date",
        label: "Fecha de apertura",
        value: formatPrimaryDate(new Date(String(saving.creationDate))),
      },
    ],
    [EProductType.VIEWSAVINGS]: [],
    [EProductType.PROGRAMMEDSAVINGS]: [],
  };

  return attributes[productTypeCode] || {};
};

export { getProductAttributes, getProductDetails };
