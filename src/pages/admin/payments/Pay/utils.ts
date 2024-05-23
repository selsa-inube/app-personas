import { enviroment } from "@config/enviroment";
import { IUser } from "@inube/auth/dist/types/user";
import { NavigateFunction } from "react-router-dom";
import { IPaymentRequest } from "src/model/entity/payment";
import { savePaymentTracking } from "src/services/analytics/savePaymentTracking";
import { createPaymentRequest } from "src/services/iclient/payments/createPaymentRequest";
import { sendTeamsMessage } from "src/services/teams/sendMessage";
import { paySteps } from "./config/assisted";
import { mapPaymentMethod } from "./config/mappers";
import { EMoneySourceType } from "./forms/PaymentMethodForm/types";
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
  navigate: NavigateFunction,
) => {
  const filteredPayments = pay.obligations.values.payments.filter(
    (payment) => payment.valueToPay && payment.valueToPay > 0,
  );

  const filteredPaymentMethod = Object.values(
    pay.paymentMethod.values.moneySources || {},
  ).filter((moneySource) => moneySource.value > 0);

  const paymentRequestData: IPaymentRequest = {
    customerCode: user.identification,
    customerName: `${user.firstName} ${user.firstLastName}`,
    comments: pay.comments.values.comments,
    payments: filteredPayments,
    paymentMethod: filteredPaymentMethod,
    urlRedirect: `${window.location.origin}/payments/history`,
    source: "preliquidacion_web",
  };

  const hasPSEMethod = filteredPaymentMethod.some(
    (moneySource) => moneySource.type === EMoneySourceType.PSE,
  );
  const hasSavingAccountMethod = filteredPaymentMethod.some(
    (moneySource) => moneySource.type === EMoneySourceType.SAVINGACCOUNT,
  );

  const creationTime = new Date();
  let confirmationType = "succeed";

  try {
    const paymentRequestResponse = await createPaymentRequest(
      paymentRequestData,
      accessToken,
    );

    if (!hasPSEMethod && hasSavingAccountMethod) {
      navigate("/payments/history");
      return;
    }

    if (paymentRequestResponse) {
      window.open(paymentRequestResponse.url, "_self");
    }
  } catch (error) {
    confirmationType = "failed";

    throw error;
  } finally {
    const totalPayment = pay.obligations.values.totalPayment;
    const paymentMethods = filteredPaymentMethod.map(
      (moneySource) => moneySource.type,
    );

    if (enviroment.IS_PRODUCTION) {
      const confirmationTime = new Date();
      const trackId = await savePaymentTracking(
        creationTime,
        confirmationTime,
        confirmationType,
        totalPayment,
        filteredPayments.map((payment) => payment.group),
        paymentMethods,
      );

      if (confirmationType === "failed") {
        sendTeamsMessage({
          type: "MessageCard",
          summary: "Payment failure",
          title: "Failed payment",
          subtitle: "Details",
          facts: [
            { name: "Track ID:", value: trackId },
            { name: "User ID:", value: user.identification },
            { name: "Date:", value: confirmationTime },
            { name: "Amount:", value: totalPayment },
            { name: "Payment methods:", value: paymentMethods.join(", ") },
          ],
        });
      }
    }
  }
};

export { payStepsRules, sendPaymentRequest };
