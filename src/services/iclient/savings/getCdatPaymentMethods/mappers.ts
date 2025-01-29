import { IOption } from "@inubekit/inubekit";

const paymentMethodDescription: Record<string, string> = {
  DEBAHORINT: "Débito automático",
  PAGOPSE: "Pagar con PSE",
  MULTOPCPAG: "Multiples formas de pago",
};

const mapPaymentMethodApiToEntity = (
  paymentMethod: Record<string, string | number | object>,
): IOption => {
  return {
    id: String(paymentMethod.value),
    value: String(paymentMethod.value),
    label: paymentMethodDescription[String(paymentMethod.value)],
  };
};

const mapPaymentMethodsApiToEntities = (
  paymentMethods: Record<string, string | number | object>[],
): IOption[] => {
  return paymentMethods.map((paymentMethod) =>
    mapPaymentMethodApiToEntity(paymentMethod),
  );
};

export { mapPaymentMethodApiToEntity, mapPaymentMethodsApiToEntities };
