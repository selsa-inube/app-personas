import { enviroment } from "@config/enviroment";
import { IUser } from "@inube/auth";
import { IServiceDomains } from "src/context/app/types";
import { createUpdateDataRequest } from "src/services/iclient/updateData/createUpdateDataRequest";
import { IUpdateDataRequest } from "src/services/iclient/updateData/createUpdateDataRequest/types";
import { sendTeamsMessage } from "src/services/teams/sendMessage";
import { updateDataSteps } from "./config/assisted";
import { IFormsUpdateData, IFormsUpdateDataRefs } from "./types";

const updateDataStepsRules = (
  currentStep: number,
  currentUpdateData: IFormsUpdateData,
  formReferences: IFormsUpdateDataRefs,
  isCurrentFormValid: boolean,
) => {
  let newUpdateData = { ...currentUpdateData };

  switch (currentStep) {
    case updateDataSteps.familyGroup.number: {
      const values = formReferences.familyGroup.current?.values;

      if (!values) return currentUpdateData;

      newUpdateData.familyGroup = {
        isValid: isCurrentFormValid,
        values,
      };

      const isDirty =
        JSON.stringify(values) !==
        JSON.stringify(currentUpdateData.familyGroup.values);

      const newBeneficiaries = values.entries.map((entry) => ({
        id: String(entry.identificationNumber || ""),
        name: `${entry.firstName} ${entry.secondName || ""} ${entry.firstLastName} ${entry.secondLastName || ""}`,
        percentage: isDirty
          ? undefined
          : newUpdateData.beneficiaries.values.beneficiaries.find(
              (b) => b.id === String(entry.identificationNumber),
            )?.percentage,
      }));

      newUpdateData.beneficiaries = {
        isValid: !isDirty,
        values: {
          beneficiaries: newBeneficiaries,
          totalPercentage: isDirty
            ? 0
            : newUpdateData.beneficiaries.values.totalPercentage,
        },
      };

      return newUpdateData;
    }
  }

  const stepKey = Object.entries(updateDataSteps).find(
    ([, config]) => config.number === currentStep,
  )?.[0];

  if (!stepKey) return currentUpdateData;

  const values =
    formReferences[stepKey as keyof IFormsUpdateData]?.current?.values;

  return (newUpdateData = {
    ...newUpdateData,
    [stepKey]: { isValid: isCurrentFormValid, values },
  });
};

const sendUpdateDataRequest = async (
  user: IUser,
  updateData: IFormsUpdateData,
  serviceDomains: IServiceDomains,
  accessToken: string,
) => {
  const updateDataRequestData: IUpdateDataRequest = {
    customerCode: user.identification,
    personalInformation: {
      ...updateData.personalInformation.values,
      countryName:
        serviceDomains.valueOf(
          updateData.personalInformation.values.country,
          "countries",
        )?.label || "",
    },
    contactData: {
      ...updateData.contactData.values,
    },
    bankTransfers: {
      ...updateData.bankTransfers.values,
      accountNumber: updateData.bankTransfers.values.accountNumber
        ? String(updateData.bankTransfers.values.accountNumber)
        : "",
      bankEntityCode:
        serviceDomains?.valueOf(
          updateData.bankTransfers.values.bankEntityName,
          "integratedbanks",
        )?.id || "",
      bankEntityName:
        serviceDomains?.valueOf(
          updateData.bankTransfers.values.bankEntityName,
          "integratedbanks",
        )?.label || "",
    },
    financialOperations: {
      ...updateData.financialOperations.values,
      bankEntityCode: updateData.financialOperations.values.bankEntityCode
        ? String(updateData.financialOperations.values.bankEntityCode)
        : "",
      bankEntityName: updateData.financialOperations.values.bankEntityName
        ? String(updateData.financialOperations.values.bankEntityName)
        : "",
      descriptionOperations: updateData.financialOperations.values
        .descriptionOperations
        ? String(updateData.financialOperations.values.descriptionOperations)
        : "",
      country: updateData.financialOperations.values.country
        ? String(updateData.financialOperations.values.country)
        : "",
      currency: updateData.financialOperations.values.currency
        ? String(updateData.financialOperations.values.currency)
        : "",
      accountNumber: updateData.financialOperations.values.accountNumber
        ? String(updateData.financialOperations.values.accountNumber)
        : "",
      accountType: updateData.financialOperations.values.accountType
        ? String(updateData.financialOperations.values.accountType)
        : "",
      countryName: updateData.financialOperations.values.countryName
        ? String(updateData.financialOperations.values.countryName)
        : "",
    },
    socioeconomicInformation: {
      ...updateData.socioeconomicInformation.values,
      schoolingLevelCode: updateData.socioeconomicInformation.values
        .schoolingLevelCode
        ? String(updateData.socioeconomicInformation.values.schoolingLevelCode)
        : "",
      responsibleOfHousehold: updateData.socioeconomicInformation.values
        .responsibleOfHousehold
        ? String(
            updateData.socioeconomicInformation.values.responsibleOfHousehold,
          )
        : "",
      womanHeadOfHousehold: updateData.socioeconomicInformation.values
        .womanHeadOfHousehold
        ? String(
            updateData.socioeconomicInformation.values.womanHeadOfHousehold,
          )
        : "",
      numberPersonsInCharge: String(
        updateData.socioeconomicInformation.values.numberPersonsInCharge || "",
      ),
      vulnerableProtectionGroupCode: updateData.socioeconomicInformation.values
        .vulnerableProtectionGroupCode
        ? String(
            updateData.socioeconomicInformation.values
              .vulnerableProtectionGroupCode,
          )
        : "",
      publiclyExposed: updateData.socioeconomicInformation.values
        .publiclyExposed
        ? String(updateData.socioeconomicInformation.values.publiclyExposed)
        : "",
      incomeTax: updateData.socioeconomicInformation.values.incomeTax
        ? String(updateData.socioeconomicInformation.values.incomeTax)
        : "",
      publicResourcesAdministration: updateData.socioeconomicInformation.values
        .publicResourcesAdministration
        ? String(
            updateData.socioeconomicInformation.values
              .publicResourcesAdministration,
          )
        : "",
    },
  };

  let confirmationType = "succeed";

  try {
    await createUpdateDataRequest(updateDataRequestData, accessToken);
  } catch (error) {
    confirmationType = "failed";

    throw error;
  } finally {
    if (enviroment.IS_PRODUCTION) {
      const confirmationTime = new Date();
      if (confirmationType === "failed") {
        sendTeamsMessage({
          type: "MessageCard",
          summary: "Update data request failure",
          title: "Failed update data request",
          subtitle: "Details",
          facts: [
            { name: "User ID:", value: user.identification },
            { name: "Date:", value: confirmationTime.toISOString() },
          ],
        });
      }
    }
  }
};

export { sendUpdateDataRequest, updateDataStepsRules };
