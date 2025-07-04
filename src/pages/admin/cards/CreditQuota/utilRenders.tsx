import { IUser } from "@inube/auth/dist/types/user";
import { IMovement, IProduct } from "src/model/entity/product";
import { currencyFormat } from "src/utils/currency";
import { formatPrimaryTimestamp } from "src/utils/dates";
import { extractAttribute } from "src/utils/products";
import { obfuscateCardNumber } from "src/utils/texts";
import { CreditLimitDocument } from "./CreditLimitDocument";
import { ISelectedProductState } from "./types";

const movementsValues = (movements: IMovement[]) => {
  return movements.map((item) => {
    let charges = currencyFormat(0);
    let deposits = currencyFormat(0);

    if (item.type === "PURCHASE") {
      charges = currencyFormat(item.totalValue);
    }
    if (item.type === "PAYMENT") {
      deposits = currencyFormat(item.totalValue);
    }

    return {
      id: item.id,
      date: item.date instanceof Date && formatPrimaryTimestamp(item.date),
      reference: item.id,
      description: item.description,
      charges: charges,
      deposits: deposits,
    };
  });
};

const getCreditLimitDocument = (
  user: IUser,
  selectedProduct: ISelectedProductState,
  creditQuotas: IProduct[],
  cards: IProduct[],
  logoUrl: string,
) => {
  const fullName =
    `${user.firstLastName} ${user.secondLastName} ${user.firstName} ${user.secondName}`.toUpperCase();

  const title = selectedProduct.creditQuotaDetail.title.toUpperCase();

  const extractCardNumber = (cards: IProduct[]) => {
    const firstCard = cards[0];
    if (firstCard && Array.isArray(firstCard.attributes)) {
      const cardNumberAttribute = extractAttribute(
        firstCard.attributes,
        "card_number",
      );
      return obfuscateCardNumber(String(cardNumberAttribute?.value)) || "";
    }
    return "";
  };

  const cardNumber = extractCardNumber(cards);

  const quotaNumber =
    obfuscateCardNumber(selectedProduct.creditQuotaDetail.id) || "";

  const selectedQuota = creditQuotas.find(
    (quota) => quota.id === selectedProduct.creditQuotaDetail.id,
  );

  if (!selectedQuota) {
    return;
  }

  const getStringValue = (attribute: string) => {
    return String(
      extractAttribute(selectedProduct.creditQuotaDetail.attributes, attribute)
        ?.value || "",
    );
  };

  const nextPaymentDate = getStringValue("next_payment");
  const creditType = getStringValue("type");
  const paymentMethod = getStringValue("payment_method");

  const getNumberValue = (attribute: string) => {
    return Number(
      extractAttribute(selectedProduct.creditQuotaDetail.attributes, attribute)
        ?.value || 0,
    );
  };

  const availableValue = getNumberValue("available_space");
  const assignedValue = getNumberValue("assigned_quota");
  const usedValue = getNumberValue("used_quota");
  const nextPaymentCapital = getNumberValue("next_payment_capital");
  const totalPaymentCapital = getNumberValue("total_payment_capital");
  const minInterest = getNumberValue("min_interest");
  const totalInterest = getNumberValue("total_interest");
  const minPenaltyInterest = getNumberValue("min_penalty_interest");
  const totalPenaltyInterest = getNumberValue("total_penalty_interest");

  const minPayment = nextPaymentCapital + minInterest + minPenaltyInterest;
  const totalPayment =
    totalPaymentCapital + totalInterest + totalPenaltyInterest;

  const movements = selectedQuota.movements || [];
  const movementEntries = movementsValues(movements);

  return (
    <CreditLimitDocument
      username={fullName}
      userIdentification={user.identification}
      cardNumber={cardNumber}
      quotaNumber={quotaNumber}
      title={title}
      availableValue={availableValue}
      assignedValue={assignedValue}
      usedValue={usedValue}
      nextPaymentDate={nextPaymentDate}
      creditType={creditType}
      paymentMethod={paymentMethod}
      nextPaymentCapital={nextPaymentCapital}
      totalPaymentCapital={totalPaymentCapital}
      minInterest={minInterest}
      totalInterest={totalInterest}
      minPenaltyInterest={minPenaltyInterest}
      totalPenaltyInterest={totalPenaltyInterest}
      minPayment={minPayment}
      totalPayment={totalPayment}
      movementEntries={movementEntries}
      logoUrl={logoUrl}
    />
  );
};

export { getCreditLimitDocument };
