import { enviroment } from "@config/enviroment";
import { IUser } from "@inube/auth/dist/types/user";
import { developmentUsersMock } from "@mocks/users/users.mocks";
import { IPaymentRequest } from "src/model/entity/payment";
import { createPaymentRequest } from "src/services/iclient/payments/createPaymentRequest";
import { paySteps } from "./config/assisted";
import { mapPaymentMethod } from "./config/mappers";
import { IFormsPay, IFormsPayRefs } from "./types";

const payStepsRules = (
  currentStep: number,
  currentPay: IFormsPay,
  formReferences: IFormsPayRefs,
  isCurrentFormValid: boolean,
) => {
  let newPay = { ...currentPay };

  switch (currentStep) {
    case paySteps.obligations.id: {
      const values = formReferences.obligations.current?.values;

      if (!values) return currentPay;

      newPay.obligations = {
        isValid: isCurrentFormValid,
        values,
      };

      if (
        JSON.stringify(values) !== JSON.stringify(currentPay.obligations.values)
      ) {
        newPay.paymentMethod = {
          isValid: false,
          values: {
            ...mapPaymentMethod(),
            valueToPay: values.totalPayment,
            pendingValue: values.totalPayment,
          },
        };
      }

      return newPay;
    }
  }

  const stepKey = Object.entries(paySteps).find(
    ([, config]) => config.id === currentStep,
  )?.[0];

  if (!stepKey) return currentPay;

  const values = formReferences[stepKey as keyof IFormsPay]?.current?.values;

  return (newPay = {
    ...newPay,
    [stepKey]: { isValid: isCurrentFormValid, values },
  });
};

const sendPaymentRequest = async (
  user: IUser,
  pay: IFormsPay,
  accessToken: string,
) => {
  const filteredPayments = pay.obligations.values.payments.filter(
    (payment) => payment.valueToPay && payment.valueToPay > 0,
  );

  const filteredPaymentMethod = Object.values(
    pay.paymentMethod.values.moneySources || {},
  ).filter((moneySource) => moneySource.value > 0);

  const paymentRequestData: IPaymentRequest = {
    customerCode:
      developmentUsersMock[user.identification] || user.identification,
    customerName: `${user.firstName} ${user.firstLastName}`,
    comments: pay.comments.values.comments,
    payments: filteredPayments,
    paymentMethod: filteredPaymentMethod,
    urlRedirect: `${enviroment.REDIRECT_URI}payments/history`,
    source: "preliquidacion_web"
  };

  const paymentRequestResponse = await createPaymentRequest(
    paymentRequestData,
    accessToken,
  );

  if (paymentRequestResponse) {
    window.open(paymentRequestResponse.url, "_self");
  }
};


export { payStepsRules, sendPaymentRequest };
