import { enviroment } from "@config/enviroment";
import { mapSystemValidations } from "@forms/SystemValidationsForm/mappers";
import { IUser } from "@inube/auth/dist/types/user";
import { EPaymentMethodType } from "src/model/entity/payment";
import { savePaymentTracking } from "src/services/analytics/savePaymentTracking";
import { createCdatRequest } from "src/services/iclient/savings/createCdatRequest";
import { IRequestCdatRequest } from "src/services/iclient/savings/createCdatRequest/types";
import { sendTeamsMessage } from "src/services/teams/sendMessage";
import { cdatRequestSteps } from "./config/assisted";
import { initalValuesCDAT } from "./config/initialValues";
import { paymentMethods } from "./forms/PaymentMethodForm/config/payment";
import { IFormsCdatRequest, IFormsCdatRequestRefs } from "./types";

const cdatStepsRules = (
  currentStep: number,
  currentCdatRequest: IFormsCdatRequest,
  formReferences: IFormsCdatRequestRefs,
  isCurrentFormValid: boolean,
) => {
  let newCdatRequest = { ...currentCdatRequest };

  switch (currentStep) {
    case cdatRequestSteps.investment.number: {
      const values = formReferences.investment.current?.values;

      if (!values) return currentCdatRequest;

      newCdatRequest.investment = {
        isValid: isCurrentFormValid,
        values,
      };

      if (
        JSON.stringify(values) !==
        JSON.stringify(currentCdatRequest.investment.values)
      ) {
        newCdatRequest.deadline = {
          isValid: false,
          values: {
            ...initalValuesCDAT.deadline,
            productId: values.product?.id || "",
            productName: values.product?.title || "",
            investmentValue: values.investmentValue || 0,
          },
        };

        newCdatRequest.paymentMethod = {
          isValid: false,
          values: {
            ...initalValuesCDAT.paymentMethod,
            investmentValue: values.investmentValue || 0,
          },
        };
      }
      return newCdatRequest;
    }
    case cdatRequestSteps.deadline.number: {
      const values = formReferences.deadline.current?.values;

      if (!values) return currentCdatRequest;

      newCdatRequest.deadline = {
        isValid: isCurrentFormValid,
        values,
      };

      if (
        JSON.stringify(values) !==
        JSON.stringify(currentCdatRequest.deadline.values)
      ) {
        newCdatRequest.systemValidations = {
          isValid: false,
          values: {
            ...mapSystemValidations(),
            productId: values.productId,
            productName: values.productName,
            amount: values.investmentValue,
            deadline: values.deadlineDays,
            rate: values.effectiveAnnualRate,
          },
        };
      }
      return newCdatRequest;
    }
  }

  const stepKey = Object.entries(cdatRequestSteps).find(
    ([, config]) => config.number === currentStep,
  )?.[0];

  if (!stepKey) return currentCdatRequest;

  const values =
    formReferences[stepKey as keyof IFormsCdatRequest]?.current?.values;

  return (newCdatRequest = {
    ...newCdatRequest,
    [stepKey]: { isValid: isCurrentFormValid, values },
  });
};

const sendCdatRequest = async (
  user: IUser,
  cdatRequest: IFormsCdatRequest,
  accessToken: string,
) => {
  const paymentMethodPSE =
    cdatRequest.paymentMethod.values.paymentMethod === EPaymentMethodType.PSE;

  const comments = `Datos de contacto: Celular: ${cdatRequest.contactChannels.values.cellPhone} Correo: ${cdatRequest.contactChannels.values.email} Teléfono: ${cdatRequest.contactChannels.values.landlinePhone}`;

  const paymentMethodType =
    cdatRequest.paymentMethod.values.paymentMethod === "DEBAHORINT"
      ? "DebitInternalSavingsAccount"
      : cdatRequest.paymentMethod.values.paymentMethod === "PAGOPSE"
        ? "PaymentByPSE"
        : "";

  const cdatRequestData: IRequestCdatRequest = {
    comments,
    customerCode: user.identification,
    customerName: `${user.firstName} ${user.secondName} ${user.firstLastName} ${user.secondLastName}`,
    product: cdatRequest.deadline.values.productId,
    productName: cdatRequest.deadline.values.productName,
    requestedAmount: cdatRequest.deadline.values.investmentValue,
    termInDays: cdatRequest.deadline.values.deadlineDays || 0,
    interestRate: cdatRequest.deadline.values.effectiveAnnualRate || 0,
    actionAfterExpiration:
      cdatRequest.actionExpiration.values.actionExpiration || "",
    termsConditions: {
      ids: cdatRequest.termsAndConditions.values.ids,
      description:
        cdatRequest.termsAndConditions.values.termsConditions.join(" "),
    },
    disbursmentMethod: {
      id: cdatRequest.disbursement.values.disbursement || "",
      name: cdatRequest.disbursement.values.disbursementName || "",
      accountNumber: cdatRequest.disbursement.values.accountNumber,
      transferAccountNumber: cdatRequest.disbursement.values.writeAccountNumber,
      transferAccountType: cdatRequest.disbursement.values.accountType,
      transferBankEntity: cdatRequest.disbursement.values.bankEntity,
      firstName: cdatRequest.disbursement.values.firstName,
      secondName: cdatRequest.disbursement.values.secondName,
      firstLastName: cdatRequest.disbursement.values.firstLastName,
      secondLastName: cdatRequest.disbursement.values.secondLastName,
      gender: cdatRequest.disbursement.values.gender,
      genderName: cdatRequest.disbursement.values.gender,
      identificationType: cdatRequest.disbursement.values.identificationType,
      identification: cdatRequest.disbursement.values.identification,
    },
    paymentMethod: {
      paymentType: paymentMethodType,
      accountNumber: cdatRequest.paymentMethod.values.accountNumber || "",
      descriptionPayment: cdatRequest.paymentMethod.values.paymentMethodName,
      value: cdatRequest.deadline.values.investmentValue,
      urlRedirect: `${window.location.origin}/my-requests`,
    },
    validations: cdatRequest.systemValidations.values.validations,
  };

  const creationTime = new Date();
  let confirmationType = "succeed";

  try {
    const cdatRequestResponse = await createCdatRequest(
      cdatRequestData,
      accessToken,
    );
    console.log(cdatRequestResponse);
    if (cdatRequestResponse && paymentMethodPSE) {
      console.log(cdatRequestResponse.url);
      window.open(cdatRequestResponse.url, "_self");
    }
  } catch (error) {
    confirmationType = "failed";

    throw error;
  } finally {
    const totalPayment = Number(
      cdatRequest.investment.values.investmentValue || 0,
    );

    if (enviroment.IS_PRODUCTION) {
      const confirmationTime = new Date();
      const trackId = await savePaymentTracking(
        creationTime,
        confirmationTime,
        confirmationType,
        totalPayment,
        ["CDAT"],
        [cdatRequest.paymentMethod.values.paymentMethodName],
        user.identification,
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

export { cdatStepsRules, sendCdatRequest };
