import { ISystemValidationsEntry } from "./types";

const mapSystemValidations = (): ISystemValidationsEntry => ({
  validations: [],
  documents: [],
  productId: "",
  productName: "",
  destinationId: "",
  destinationName: "",
  paymentMethod: "",
  paymentMethodName: "",
  amount: 0,
  periodicity: "",
  deadline: 0,
  rate: 0,
  amortizationType: "",
  quota: 0,
  netValue: 0,
});

export { mapSystemValidations };
