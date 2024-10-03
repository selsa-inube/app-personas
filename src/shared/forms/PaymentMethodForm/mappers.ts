import { IPaymentMethodEntry } from "./types";

const mapPaymentMethod = (): IPaymentMethodEntry => {
  return {
    paymentMethods: [],
    paymentMethodType: "",
  };
};

export { mapPaymentMethod };
