import { IPaymentHistory } from "src/model/entity/payment";

const staticAttributes = [
  { id: "paymentDate", label: "Fecha", value: "" },
  { id: "paymentMethod", label: "Forma de pago", value: "" },
  { id: "cus", label: "CUS", value: "" },
];

const generateAttributes = (payment: IPaymentHistory) =>
  staticAttributes.map((attr) => ({
    ...attr,
    value: payment[attr.id as keyof IPaymentHistory] as string | number | Date,
  }));

export { generateAttributes };