import { ISelectOption } from "@design/input/Select/types";

const paymentMethodDescription: Record<string, string> = {
  DEBAHORINT: "Débito automático",
  PAGOPSE: "Pagar con PSE",
  MULTOPCPAG: "Multiples formas de pago",
};

const mapPaymentMethodApiToEntity = (
  paymentMethod: Record<string, string | number | object>,
): ISelectOption => {
  return {
    id: String(paymentMethod.value),
    value: paymentMethodDescription[String(paymentMethod.value)],
  };
};

const mapPaymentMethodsApiToEntities = (
  paymentMethods: Record<string, string | number | object>[],
): ISelectOption[] => {
  return paymentMethods.map((paymentMethod) =>
    mapPaymentMethodApiToEntity(paymentMethod),
  );
};

export { mapPaymentMethodApiToEntity, mapPaymentMethodsApiToEntities };
