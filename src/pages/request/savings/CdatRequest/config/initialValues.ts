import { IDeadlineEntry } from "../forms/DeadlineForm/types";
import { IPaymentMethodEntry } from "../forms/PaymentMethodForm/types";

const deadline: IDeadlineEntry = {
  simulationWithDate: false,
  simulationWithDays: false,
  deadlineDate: "",
  deadlineDays: "",
  hasResult: false,
};

const paymentMethod: IPaymentMethodEntry = {
  paymentMethods: [],
  paymentMethod: "",
  paymentMethodName: "",
};

const initalValuesCDAT = {
  deadline,
  paymentMethod,
};

export { initalValuesCDAT };
