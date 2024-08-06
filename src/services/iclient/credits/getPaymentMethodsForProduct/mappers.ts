import { ISelectOption } from "@design/input/Select/types";
import { capitalizeText } from "src/utils/texts";

const mapPaymentMethodApiToEntity = (
  paymentmethod: Record<string, string | number | object>,
): ISelectOption => {
  return {
    id: String(paymentmethod.paymentMethodId),
    value: capitalizeText(String(paymentmethod.name).toLowerCase()),
  };
};

const mapPaymentMethodsApiToEntities = (
  paymentmethods: Record<string, string | number | object>[],
): ISelectOption[] => {
  return paymentmethods.map((paymentmethod) =>
    mapPaymentMethodApiToEntity(paymentmethod),
  );
};

export { mapPaymentMethodApiToEntity, mapPaymentMethodsApiToEntities };
