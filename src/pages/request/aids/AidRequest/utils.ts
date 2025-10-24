import { enviroment } from "@config/enviroment";
import { mapSystemValidations } from "@forms/SystemValidationsForm/mappers";
import { IUser } from "@inube/auth";
import { createAidRequest } from "src/services/iclient/aids/createAidRequest";
import { IRequestAidRequest } from "src/services/iclient/aids/createAidRequest/types";
import { sendTeamsMessage } from "src/services/teams/sendMessage";
import { aidRequestSteps } from "./config/assisted";
import { IFormsAidRequest, IFormsAidRequestRefs } from "./types";

const aidRequestStepsRules = (
  currentStep: number,
  currentAidRequest: IFormsAidRequest,
  formReferences: IFormsAidRequestRefs,
  isCurrentFormValid: boolean,
) => {
  const newAidRequest = { ...currentAidRequest };

  switch (currentStep) {
    case aidRequestSteps.detailsSituation.number: {
      const values = formReferences.detailsSituation.current?.values;

      if (!values) return currentAidRequest;

      newAidRequest.detailsSituation = {
        isValid: isCurrentFormValid,
        values,
      };

      if (
        JSON.stringify(values) !==
        JSON.stringify(currentAidRequest.detailsSituation.values)
      ) {
        newAidRequest.systemValidations = {
          isValid: false,
          values: {
            ...mapSystemValidations(),
            productId: values.aidId,
            productName: values.aidName,
            amount: values.applicationValue
              ? values.applicationValue
              : values.applicationDays || 0,
          },
        };
      }

      return newAidRequest;
    }
    case aidRequestSteps.systemValidations.number: {
      const values = formReferences.systemValidations.current?.values;

      if (!values) return currentAidRequest;

      newAidRequest.systemValidations = {
        isValid: isCurrentFormValid,
        values,
      };

      if (
        JSON.stringify(values) !==
        JSON.stringify(currentAidRequest.systemValidations.values)
      ) {
        const requiredIds = values.documents
          .filter((doc) => doc.required)
          .map((doc) => doc.id);

        const currentSelectedDocuments =
          currentAidRequest.documentaryRequirements.values.selectedDocuments;

        const allRequiredUploaded = requiredIds.every((requiredId) =>
          currentSelectedDocuments.some(
            (selectedDoc) =>
              selectedDoc.documentType === requiredId && selectedDoc.file,
          ),
        );

        newAidRequest.documentaryRequirements = {
          isValid: allRequiredUploaded,
          values: {
            ...currentAidRequest.documentaryRequirements.values,
            requiredDocuments: values.documents,
          },
        };
      }

      return newAidRequest;
    }
  }

  const stepKey = Object.entries(aidRequestSteps).find(
    ([, config]) => config.number === currentStep,
  )?.[0];

  if (!stepKey) return currentAidRequest;

  const values =
    formReferences[stepKey as keyof IFormsAidRequest]?.current?.values;

  return {
    ...newAidRequest,
    [stepKey]: { isValid: isCurrentFormValid, values },
  };
};

const sendAidRequest = async (
  user: IUser,
  aidRequest: IFormsAidRequest,
  accessToken: string,
) => {
  const comments = `Datos de contacto: Celular: ${aidRequest.contactChannels.values.cellPhone} Correo: ${aidRequest.contactChannels.values.email} Teléfono: ${aidRequest.contactChannels.values.landlinePhone}`;

  const aidRequestData: IRequestAidRequest = {
    comments: `${aidRequest.detailsSituation.values.message} ${comments}`,
    customerCode: user.identification,
    customerName: `${user.firstName} ${user.lastName}`,
    product: aidRequest.detailsSituation.values.aidId,
    productName: aidRequest.detailsSituation.values.aidName,
    termsConditions: {
      ids: aidRequest.termsAndConditions.values.ids,
      description:
        aidRequest.termsAndConditions.values.termsConditions.join(" "),
    },
    amount: aidRequest.detailsSituation.values.applicationValue
      ? aidRequest.detailsSituation.values.applicationValue
      : aidRequest.detailsSituation.values.applicationDays || 0,
    disbursmentMethod: {
      id: aidRequest.disbursement.values.disbursement || "",
      name: aidRequest.disbursement.values.disbursementName || "",
      accountNumber: aidRequest.disbursement.values.accountNumber,
      transferAccountNumber: aidRequest.disbursement.values.writeAccountNumber,
      transferAccountType: aidRequest.disbursement.values.accountType,
      transferBankEntity: aidRequest.disbursement.values.bankEntity,
      firstName: aidRequest.disbursement.values.firstName,
      secondName: aidRequest.disbursement.values.secondName,
      firstLastName: aidRequest.disbursement.values.firstLastName,
      secondLastName: aidRequest.disbursement.values.secondLastName,
      gender: aidRequest.disbursement.values.gender,
      genderName: aidRequest.disbursement.values.gender,
      identificationType: aidRequest.disbursement.values.identificationType,
      identification: aidRequest.disbursement.values.identification,
    },
    documentaryRequirements:
      aidRequest.documentaryRequirements.values.selectedDocuments,
    validations: aidRequest.systemValidations.values.validations,
    beneficiary: aidRequest.beneficiaries.values.beneficiaries.find(
      (beneficiary) => beneficiary.selected === true,
    ),
  };

  let confirmationType = "succeed";

  try {
    await createAidRequest(aidRequestData, accessToken);
  } catch (error) {
    confirmationType = "failed";

    throw error;
  } finally {
    if (enviroment.IS_PRODUCTION) {
      const confirmationTime = new Date();
      if (confirmationType === "failed") {
        sendTeamsMessage({
          type: "MessageCard",
          summary: "Aid request failure",
          title: "Failed aid request",
          subtitle: "Details",
          facts: [
            { name: "User ID:", value: user.identification },
            { name: "Date:", value: confirmationTime.toISOString() },
            { name: "Amount:", value: aidRequestData.amount },
            { name: "Aid type:", value: aidRequestData.product },
          ],
        });
      }
    }
  }
};

export { aidRequestStepsRules, sendAidRequest };
