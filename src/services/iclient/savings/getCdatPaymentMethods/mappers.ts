import { IOption } from "@inubekit/inubekit";
import { collectMethodDM } from "src/model/domains/payments/collectMethodDM";

const mapPaymentMethodApiToEntity = (
  paymentMethod: Record<string, string | number | object>,
): IOption => {
  return {
    id: String(paymentMethod.value),
    value: String(paymentMethod.value),
    label: collectMethodDM.valueOf(String(paymentMethod.value))?.value || "",
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
