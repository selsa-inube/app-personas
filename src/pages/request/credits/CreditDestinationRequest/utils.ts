import { enviroment } from "@config/enviroment";
import { mapDocumentaryRequirements } from "@forms/DocumentaryRequirementsForm/mappers";
import { mapPaymentMethod } from "@forms/PaymentMethodForm/mappers";
import { mapSystemValidations } from "@forms/SystemValidationsForm/mappers";
import { loadingValidations } from "@forms/SystemValidationsForm/utils";
import { IUser } from "@inube/auth/dist/types/user";
import { NavigateFunction } from "react-router-dom";
import { createCreditRequest } from "src/services/iclient/credits/createCreditRequest";
import { IRequestCreditRequest } from "src/services/iclient/credits/createCreditRequest/types";
import { sendTeamsMessage } from "src/services/teams/sendMessage";
import { creditDestinationRequestSteps } from "./config/assisted";
import { initalValuesCreditDestination } from "./config/initialValues";
import {
  IFormsCreditDestinationRequest,
  IFormsCreditDestinationRequestRefs,
} from "./types";

const creditDestinationStepsRules = (
  currentStep: number,
  currentCreditDestinationRequest: IFormsCreditDestinationRequest,
  formReferences: IFormsCreditDestinationRequestRefs,
  isCurrentFormValid: boolean,
) => {
  let newCreditDestinationRequest = { ...currentCreditDestinationRequest };

  switch (currentStep) {
    case creditDestinationRequestSteps.destination.number: {
      const values = formReferences.destination.current?.values;

      if (!values) return currentCreditDestinationRequest;

      newCreditDestinationRequest.destination = {
        isValid: isCurrentFormValid,
        values,
      };

      if (
        JSON.stringify(values) !==
          JSON.stringify(currentCreditDestinationRequest.destination.values) &&
        values.product
      ) {
        newCreditDestinationRequest.creditConditions = {
          isValid: false,
          values: {
            ...initalValuesCreditDestination.creditConditions,
            destination: values.destination,
            product: values.product,
          },
        };
      }

      return newCreditDestinationRequest;
    }
    case creditDestinationRequestSteps.creditConditions.number: {
      const values = formReferences.creditConditions.current?.values;

      if (!values) return currentCreditDestinationRequest;

      newCreditDestinationRequest.creditConditions = {
        isValid: isCurrentFormValid,
        values,
      };

      if (
        JSON.stringify(values) !==
        JSON.stringify(currentCreditDestinationRequest.creditConditions.values)
      ) {
        newCreditDestinationRequest.systemValidations = {
          isValid: false,
          values: {
            ...mapSystemValidations(),
            validations: loadingValidations,
            destinationId: values.destination?.id || "",
            destinationName: values.destination?.value || "",
            productId: values.product.id,
            productName: values.product.title,
            paymentMethod: values.paymentMethod?.id || "",
            paymentMethodName: values.paymentMethod?.value || "",
            amount: values.amount || 0,
            deadline: values.deadline || 0,
            rate: values.rate,
            amortizationType: values.product.amortizationType,
            periodicity: values.periodicity.id,
            quota: values.quota || 0,
            netValue: values.netValue,
          },
        };

        newCreditDestinationRequest.paymentMethod = {
          isValid: false,
          values: {
            ...mapPaymentMethod(),
            paymentMethodType: values.paymentMethod?.id || "",
            paymentMethods: values.paymentMethods,
          },
        };
      }

      return newCreditDestinationRequest;
    }
    case creditDestinationRequestSteps.systemValidations.number: {
      const values = formReferences.systemValidations.current?.values;

      if (!values) return currentCreditDestinationRequest;

      newCreditDestinationRequest.systemValidations = {
        isValid: isCurrentFormValid,
        values,
      };

      if (
        JSON.stringify(values) !==
        JSON.stringify(currentCreditDestinationRequest.systemValidations.values)
      ) {
        newCreditDestinationRequest.documentaryRequirements = {
          isValid: true,
          values: {
            ...mapDocumentaryRequirements(),
            requiredDocuments: values.documents,
          },
        };
      }

      return newCreditDestinationRequest;
    }
  }

  const stepKey = Object.entries(creditDestinationRequestSteps).find(
    ([, config]) => config.number === currentStep,
  )?.[0];

  if (!stepKey) return currentCreditDestinationRequest;

  const values =
    formReferences[stepKey as keyof IFormsCreditDestinationRequest]?.current
      ?.values;

  return (newCreditDestinationRequest = {
    ...newCreditDestinationRequest,
    [stepKey]: { isValid: isCurrentFormValid, values },
  });
};

const sendCreditRequest = async (
  user: IUser,
  creditRequest: IFormsCreditDestinationRequest,
  accessToken: string,
  navigate: NavigateFunction,
) => {
  const comments = `${creditRequest.comments.values.comments} - Datos de contacto: Celular: ${creditRequest.contactChannels.values.cellPhone} Correo: ${creditRequest.contactChannels.values.email} Teléfono: ${creditRequest.contactChannels.values.landlinePhone}`;

  const creditRequestData: IRequestCreditRequest = {
    comments,
    customerCode: user.identification,
    destination: creditRequest.destination.values.destination?.id || "",
    destinationName: creditRequest.destination.values.destination?.value || "",
    product: creditRequest.destination.values.product?.id || "",
    productName: creditRequest.destination.values.product?.title || "",
    termsConditions: {
      ids: creditRequest.termsAndConditions.values.ids,
      description:
        creditRequest.termsAndConditions.values.termsConditions.join(" "),
    },
    conditions: {
      amount: creditRequest.creditConditions.values.amount || 0,
      deadline: creditRequest.creditConditions.values.deadline || 0,
      rate: creditRequest.creditConditions.values.rate,
      paymentMethod:
        creditRequest.creditConditions.values.paymentMethod?.id || "",
      paymentMethodName:
        creditRequest.creditConditions.values.paymentMethod?.value || "",
      periodicityInMonths:
        creditRequest.creditConditions.values.periodicity?.periodicityInMonths?.toString() ||
        "",
      quota: creditRequest.creditConditions.values.quota || 0,
      disbursement: {
        anticipatedInterest:
          creditRequest.creditConditions.values.anticipatedInterest,
        charges: creditRequest.creditConditions.values.charges,
        discounts: creditRequest.creditConditions.values.discounts,
        netValue: creditRequest.creditConditions.values.netValue,
      },
    },
    disbursmentMethod: {
      id: creditRequest.disbursement.values.disbursement || "",
      name: creditRequest.disbursement.values.disbursementName || "",
      accountNumber: creditRequest.disbursement.values.accountNumber,
      transferAccountNumber:
        creditRequest.disbursement.values.writeAccountNumber,
      transferAccountType: creditRequest.disbursement.values.accountType,
      transferBankEntity: creditRequest.disbursement.values.bankEntity,
      firstName: creditRequest.disbursement.values.firstName,
      secondName: creditRequest.disbursement.values.secondName,
      firstLastName: creditRequest.disbursement.values.firstLastName,
      secondLastName: creditRequest.disbursement.values.secondLastName,
      gender: creditRequest.disbursement.values.gender,
      genderName: creditRequest.disbursement.values.gender,
      identificationType: creditRequest.disbursement.values.identificationType,
      identification: creditRequest.disbursement.values.identification,
    },
    documentaryRequirements:
      creditRequest.documentaryRequirements.values.selectedDocuments,
    validations: creditRequest.systemValidations.values.validations,
  };

  let confirmationType = "succeed";

  try {
    await createCreditRequest(creditRequestData, accessToken);
    navigate("/my-requests?success_request=true");
  } catch (error) {
    confirmationType = "failed";

    throw error;
  } finally {
    if (enviroment.IS_PRODUCTION) {
      const confirmationTime = new Date();
      if (confirmationType === "failed") {
        sendTeamsMessage({
          type: "MessageCard",
          summary: "Credit request failure",
          title: "Failed credit request",
          subtitle: "Details",
          facts: [
            { name: "User ID:", value: user.identification },
            { name: "Date:", value: confirmationTime.toISOString() },
            { name: "Amount:", value: creditRequestData.conditions.amount },
          ],
        });
      }
    }
  }
};

export { creditDestinationStepsRules, sendCreditRequest };
