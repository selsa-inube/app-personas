import { enviroment } from "@config/enviroment";
import { mapPaymentMethod } from "@forms/PaymentMethodForm/mappers";
import { mapSystemValidations } from "@forms/SystemValidationsForm/mappers";
import { loadingValidations } from "@forms/SystemValidationsForm/utils";
import { IUser } from "@inube/auth/dist/types/user";
import { NavigateFunction } from "react-router-dom";
import { createProgrammedSavingRequest } from "src/services/iclient/savings/createProgrammedSavingRequest";
import { IRequestProgrammedSavingRequest } from "src/services/iclient/savings/createProgrammedSavingRequest/types";
import { sendTeamsMessage } from "src/services/teams/sendMessage";
import { programmedSavingRequestSteps } from "./config/assisted";
import { initalValuesProgrammedSaving } from "./config/initialValues";
import {
  IFormsProgrammedSavingRequest,
  IFormsProgrammedSavingRequestRefs,
} from "./types";

const programmedSavingStepsRules = (
  currentStep: number,
  currentProgrammedSavingRequest: IFormsProgrammedSavingRequest,
  formReferences: IFormsProgrammedSavingRequestRefs,
  isCurrentFormValid: boolean,
) => {
  let newProgrammedSavingRequest = {
    ...currentProgrammedSavingRequest,
  };

  switch (currentStep) {
    case programmedSavingRequestSteps.destination.number: {
      const values = formReferences.destination.current?.values;

      if (!values) return currentProgrammedSavingRequest;

      newProgrammedSavingRequest.destination = {
        isValid: isCurrentFormValid,
        values,
      };

      if (
        JSON.stringify(values) !==
        JSON.stringify(currentProgrammedSavingRequest.savingConditions.values)
      ) {
        newProgrammedSavingRequest.systemValidations = {
          isValid: false,
          values: {
            ...mapSystemValidations(),
            productId: values?.product?.id || "",
            productName: values?.product?.title || "",
          },
        };

        newProgrammedSavingRequest.savingConditions = {
          isValid: false,
          values: {
            ...initalValuesProgrammedSaving.savingConditions,
          },
        };
      }

      return newProgrammedSavingRequest;
    }
    case programmedSavingRequestSteps.savingConditions.number: {
      const values = formReferences.savingConditions.current?.values;

      if (!values) return currentProgrammedSavingRequest;

      newProgrammedSavingRequest.savingConditions = {
        isValid: isCurrentFormValid,
        values,
      };

      if (
        JSON.stringify(values) !==
        JSON.stringify(currentProgrammedSavingRequest.savingConditions.values)
      ) {
        newProgrammedSavingRequest.systemValidations = {
          isValid: false,
          values: {
            ...mapSystemValidations(),
            validations: loadingValidations,
            productId:
              newProgrammedSavingRequest.systemValidations.values.productId,
            productName:
              newProgrammedSavingRequest.systemValidations.values.productName,
            paymentMethod: values.paymentMethod?.id || "",
            paymentMethodName: values.paymentMethod?.value || "",
            deadline: values.deadline || 0,
            periodicity: values.periodicity.id,
            quota: values.quota || 0,
          },
        };

        newProgrammedSavingRequest.paymentMethod = {
          isValid: false,
          values: {
            ...mapPaymentMethod(),
            paymentMethodType: values.paymentMethod?.id || "",
            paymentMethods: values.paymentMethods,
          },
        };
      }

      return newProgrammedSavingRequest;
    }
  }

  const stepKey = Object.entries(programmedSavingRequestSteps).find(
    ([, config]) => config.number === currentStep,
  )?.[0];

  if (!stepKey) return currentProgrammedSavingRequest;

  const values =
    formReferences[stepKey as keyof IFormsProgrammedSavingRequest]?.current
      ?.values;

  return (newProgrammedSavingRequest = {
    ...newProgrammedSavingRequest,
    [stepKey]: { isValid: isCurrentFormValid, values },
  });
};

const sendProgrammedSavingRequest = async (
  user: IUser,
  programmedSavingRequest: IFormsProgrammedSavingRequest,
  accessToken: string,
  navigate: NavigateFunction,
) => {
  const comments = `Datos de contacto: Celular: ${programmedSavingRequest.contactChannels.values.cellPhone} Correo: ${programmedSavingRequest.contactChannels.values.email} Teléfono: ${programmedSavingRequest.contactChannels.values.landlinePhone}`;

  const programmedSavingRequestData: IRequestProgrammedSavingRequest = {
    comments,
    customerCode: user.identification,
    customerName: `${user.firstName} ${user.secondName} ${user.firstLastName} ${user.secondLastName}`,
    product: programmedSavingRequest.destination.values.product?.id || "",
    productName:
      programmedSavingRequest.destination.values.product?.title || "",
    termsConditions: {
      ids: programmedSavingRequest.termsAndConditions.values.ids,
      description:
        programmedSavingRequest.termsAndConditions.values.termsConditions.join(
          " ",
        ),
    },
    conditions: {
      deadline: programmedSavingRequest.savingConditions.values.deadline || 0,
      paymentMethod:
        programmedSavingRequest.savingConditions.values.paymentMethod?.id || "",
      paymentMethodName:
        programmedSavingRequest.savingConditions.values.paymentMethod?.value ||
        "",
      periodicity:
        programmedSavingRequest.savingConditions.values.periodicity.id,
      quota: programmedSavingRequest.savingConditions.values.quota || 0,
      shareMaturity:
        programmedSavingRequest.shareMaturity.values.shareMaturity || "",
      wayToPay: "Payroll",
    },
    disbursmentMethod: {
      id: programmedSavingRequest.disbursement.values.disbursement || "",
      name: programmedSavingRequest.disbursement.values.disbursementName || "",
      accountNumber: programmedSavingRequest.disbursement.values.accountNumber,
      transferAccountNumber:
        programmedSavingRequest.disbursement.values.writeAccountNumber,
      transferAccountType:
        programmedSavingRequest.disbursement.values.accountType,
      transferBankEntity:
        programmedSavingRequest.disbursement.values.bankEntity,
      firstName: programmedSavingRequest.disbursement.values.firstName,
      secondName: programmedSavingRequest.disbursement.values.secondName,
      firstLastName: programmedSavingRequest.disbursement.values.firstLastName,
      secondLastName:
        programmedSavingRequest.disbursement.values.secondLastName,
      gender: programmedSavingRequest.disbursement.values.gender,
      genderName: programmedSavingRequest.disbursement.values.gender,
      identificationType:
        programmedSavingRequest.disbursement.values.identificationType,
      identification:
        programmedSavingRequest.disbursement.values.identification,
    },
    validations: programmedSavingRequest.systemValidations.values.validations,
  };

  let confirmationType = "succeed";

  try {
    await createProgrammedSavingRequest(
      programmedSavingRequestData,
      accessToken,
    );
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
          summary: "Programmed Saving request failure",
          title: "Failed programmed saving request",
          subtitle: "Details",
          facts: [
            { name: "User ID:", value: user.identification },
            { name: "Date:", value: confirmationTime.toISOString() },
            {
              name: "Saving type:",
              value: programmedSavingRequestData.product,
            },
          ],
        });
      }
    }
  }
};

export { programmedSavingStepsRules, sendProgrammedSavingRequest };
