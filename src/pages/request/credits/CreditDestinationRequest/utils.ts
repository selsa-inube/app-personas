import { enviroment } from "@config/enviroment";
import { mapPaymentMethod } from "@forms/PaymentMethodForm/mappers";
import { mapSystemValidations } from "@forms/SystemValidationsForm/mappers";
import { IUser } from "@inube/auth";
import { createCreditRequest } from "src/services/iclient/credits/createCreditRequest";
import { IRequestCreditRequest } from "src/services/iclient/credits/createCreditRequest/types";
import { sendTeamsMessage } from "src/services/teams/sendMessage";
import { creditDestinationRequestSteps } from "./config/assisted";
import { initialValuesCreditDestination } from "./config/initialValues";
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
        newCreditDestinationRequest.simulateCredit = {
          isValid: false,
          values: {
            ...initialValuesCreditDestination.simulateCredit,
            destination: values.destination,
            product: values.product,
          },
        };
      }

      return newCreditDestinationRequest;
    }
    case creditDestinationRequestSteps.simulateCredit.number: {
      const values = formReferences.simulateCredit.current?.values;

      if (!values) return currentCreditDestinationRequest;

      newCreditDestinationRequest.simulateCredit = {
        isValid: isCurrentFormValid,
        values,
      };

      if (
        JSON.stringify(values) !==
        JSON.stringify(currentCreditDestinationRequest.simulateCredit.values)
      ) {
        newCreditDestinationRequest.systemValidations = {
          isValid: false,
          values: {
            ...mapSystemValidations(),
            destinationId: values.destination?.id || "",
            destinationName: values.destination?.label || "",
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
        const requiredIds = values.documents
          .filter((doc) => doc.required)
          .map((doc) => doc.id);

        const currentSelectedDocuments =
          currentCreditDestinationRequest.documentaryRequirements.values
            .selectedDocuments;

        const allRequiredUploaded = requiredIds.every((requiredId) =>
          currentSelectedDocuments.some(
            (selectedDoc) =>
              selectedDoc.documentType === requiredId && selectedDoc.file,
          ),
        );

        newCreditDestinationRequest.documentaryRequirements = {
          isValid: allRequiredUploaded,
          values: {
            ...currentCreditDestinationRequest.documentaryRequirements.values,
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
) => {
  const comments = `${creditRequest.comments.values.comments} - Datos de contacto: Celular: ${creditRequest.contactChannels.values.cellPhone} Correo: ${creditRequest.contactChannels.values.email} Teléfono: ${creditRequest.contactChannels.values.landlinePhone}`;

  const creditRequestData: IRequestCreditRequest = {
    comments,
    customerCode: user.identification,
    destination: creditRequest.destination.values.destination?.id || "",
    destinationName: creditRequest.destination.values.destination?.label || "",
    product: creditRequest.destination.values.product?.id || "",
    productName: creditRequest.destination.values.product?.title || "",
    amortizationType:
      creditRequest.systemValidations.values.amortizationType || "",
    termsConditions: {
      ids: creditRequest.termsAndConditions.values.ids,
      description:
        creditRequest.termsAndConditions.values.termsConditions.join(" "),
    },
    conditions: {
      amount: creditRequest.simulateCredit.values.amount || 0,
      deadline: creditRequest.simulateCredit.values.deadline || 0,
      rate: creditRequest.simulateCredit.values.rate,
      paymentMethod:
        creditRequest.simulateCredit.values.paymentMethod?.id || "",
      paymentMethodName:
        creditRequest.simulateCredit.values.paymentMethod?.value || "",
      periodicityInMonths:
        creditRequest.simulateCredit.values.periodicity?.periodicityInMonths?.toString() ||
        "",
      quota: creditRequest.simulateCredit.values.quota || 0,
      disbursement: {
        anticipatedInterest:
          creditRequest.simulateCredit.values.anticipatedInterest,
        charges: creditRequest.simulateCredit.values.charges,
        discounts: creditRequest.simulateCredit.values.discounts,
        netValue: creditRequest.simulateCredit.values.netValue,
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

  if (creditRequest.simulateCredit.values.extraordinaryQuotas) {
    creditRequestData.conditions.extraordinaryQuotas = {
      quotas: creditRequest.simulateCredit.values.extraordinaryQuotas.quotas,
      valuePerQuota:
        creditRequest.simulateCredit.values.extraordinaryQuotas.valuePerQuota,
    };
  }

  let confirmationType = "succeed";

  try {
    await createCreditRequest(creditRequestData, accessToken);
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
