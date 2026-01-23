import { EAction, IUpdateDataRequest, IUpdateDataResponse } from "./types";

const getChangedFields = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  current: Record<string, any> = {},
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updated: Record<string, any> = {},
  includesAlways: string[] = [],
  withMultiRecord = false,
  keyFields: string[] = [],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Record<string, any> => {
  const result: Record<string, unknown> = {};

  for (const key in updated) {
    if (key === "currentData") continue;

    const updatedValue = updated[key];
    const currentValue = current[key];
    const mustInclude = includesAlways.includes(key);

    if (
      withMultiRecord &&
      keyFields.includes(key) &&
      Array.isArray(updatedValue)
    ) {
      const currentArray = Array.isArray(currentValue) ? currentValue : [];
      const currentMap = new Map(
        currentArray.map((item: Record<string, unknown>) => [item.id, item]),
      );
      const updatedMap = new Map(
        updatedValue.map((item: Record<string, unknown>) => [item.id, item]),
      );

      const changes: Record<string, unknown>[] = [];

      for (const [id, updatedItem] of updatedMap.entries()) {
        const currentItem = currentMap.get(id);

        if (!currentItem) {
          changes.push({
            ...updatedItem,
            action: EAction.ADD,
          });
          continue;
        }

        // Comparar solo los campos que cambiaron
        const changedFields: Record<string, unknown> = { id };
        let hasChanged = false;

        for (const field in updatedItem) {
          if (field === "id") continue;

          const updatedFieldValue = updatedItem[field];
          const currentFieldValue = currentItem[field];

          if (
            JSON.stringify(updatedFieldValue) !==
            JSON.stringify(currentFieldValue)
          ) {
            changedFields[field] = updatedFieldValue;
            hasChanged = true;
          }
        }

        if (hasChanged) {
          changes.push({
            ...changedFields,
            action: EAction.UPDATE,
          });
        }
      }

      for (const [id] of currentMap.entries()) {
        if (!updatedMap.has(id)) {
          changes.push({
            id,
            action: EAction.DELETE,
          });
        }
      }

      if (changes.length > 0 || mustInclude) {
        result[key] = changes;
      }

      continue;
    }

    const hasChanged =
      JSON.stringify(updatedValue) !== JSON.stringify(currentValue);

    if (hasChanged || mustInclude) {
      result[key] = updatedValue;
    }
  }

  return result;
};

const mapPersonalInformationEntityToApi = (
  updateData: IUpdateDataRequest,
): Record<string, unknown> | undefined => {
  const changedPersonal = getChangedFields(
    updateData.personalInformation.currentData,
    updateData.personalInformation,
    ["identificationType"],
  );

  if (Object.keys(changedPersonal).length === 0) return undefined;

  return {
    ...changedPersonal,
    ...(changedPersonal.identificationType && {
      identificationType: changedPersonal.identificationType.id,
    }),
  } as Record<string, unknown>;
};

const mapContactDataEntityToApi = (
  updateData: IUpdateDataRequest,
): Record<string, unknown> | undefined => {
  const changedContact = getChangedFields(
    updateData.contactData.currentData,
    updateData.contactData,
    [],
    true,
    ["addresses"],
  );

  if (Object.keys(changedContact).length === 0) return undefined;

  const contactDataForApi: Record<string, unknown> = {};

  if (changedContact.cellPhone) {
    contactDataForApi.cellPhone = changedContact.cellPhone;
  }
  if (changedContact.email) {
    contactDataForApi.email = changedContact.email;
  }

  if (changedContact.addresses && Array.isArray(changedContact.addresses)) {
    const addressChanges = changedContact.addresses[0];

    if (addressChanges) {
      const { action, zipCode, ...addressFields } = addressChanges;

      if (action) {
        contactDataForApi.action = action;
      }

      if (zipCode !== undefined) {
        contactDataForApi.zipCode = String(zipCode);
      }

      Object.assign(contactDataForApi, addressFields);
    }
  }

  return Object.keys(contactDataForApi).length > 0
    ? contactDataForApi
    : undefined;
};

const mapBankTransferEntityToApi = (
  updateData: IUpdateDataRequest,
): Record<string, unknown> | undefined => {
  const changedBank = getChangedFields(
    updateData.bankTransfers.currentData,
    updateData.bankTransfers,
  );

  if (Object.keys(changedBank).length === 0) return undefined;

  const [accountTypeCode = "", accountTypeName = ""] =
    typeof changedBank.accountType === "string"
      ? changedBank.accountType.split("-").map((x: string) => x.trim())
      : [];

  const bankTransferData: Record<string, unknown> = {};

  if (changedBank.bankEntityCode) {
    bankTransferData.bankCode = changedBank.bankEntityCode;
  }
  if (changedBank.bankEntityName) {
    bankTransferData.bankName = changedBank.bankEntityName;
  }
  if (changedBank.accountNumber) {
    bankTransferData.accountNumber = String(changedBank.accountNumber);
  }
  if (changedBank.accountType) {
    bankTransferData.accountTypeCode = accountTypeCode;
    bankTransferData.accountTypeName = accountTypeName;
  }

  return Object.keys(bankTransferData).length > 0
    ? bankTransferData
    : undefined;
};

const mapFinancialOperationEntityToApi = (
  updateData: IUpdateDataRequest,
): Record<string, unknown> | undefined => {
  const changedFinancial = getChangedFields(
    updateData.financialOperations.currentData,
    updateData.financialOperations,
  );

  if (Object.keys(changedFinancial).length === 0) return undefined;

  return {
    ...(changedFinancial.hasForeignCurrencyTransactions !== undefined && {
      operationInOutside: changedFinancial.hasForeignCurrencyTransactions,
    }),
    ...(changedFinancial.descriptionOperations && {
      descriptionOutsideOperation: changedFinancial.descriptionOperations,
    }),
    ...(changedFinancial.hasForeignCurrencyAccounts !== undefined && {
      externalAccounts: changedFinancial.hasForeignCurrencyAccounts,
    }),
    ...(changedFinancial.country && {
      externalAccountCountry: changedFinancial.country,
    }),
    ...(changedFinancial.bankEntityCode && {
      externalAccountBank: changedFinancial.bankEntityCode,
    }),
    ...(changedFinancial.currency && {
      externalCurrencyAccount: changedFinancial.currency,
    }),
    ...(changedFinancial.accountNumber && {
      externalNumberAccount: changedFinancial.accountNumber,
    }),
  } as Record<string, unknown>;
};

const mapSocioeconomicInformationEntityToApi = (
  updateData: IUpdateDataRequest,
): Record<string, unknown> | undefined => {
  const changedSocioeconomic = getChangedFields(
    updateData.socioeconomicInformation.currentData,
    updateData.socioeconomicInformation,
  );

  if (Object.keys(changedSocioeconomic).length === 0) return undefined;

  return {
    ...(changedSocioeconomic.schoolingLevelCode !== undefined && {
      schoolingLevelCode: changedSocioeconomic.schoolingLevelCode,
    }),
    ...(changedSocioeconomic.responsibleOfHousehold !== undefined && {
      responsibleOfHousehold: changedSocioeconomic.responsibleOfHousehold,
    }),
    ...(changedSocioeconomic.womanHeadOfHousehold !== undefined && {
      womanHeadOfHousehold: changedSocioeconomic.womanHeadOfHousehold,
    }),
    ...(changedSocioeconomic.numberPersonsInCharge !== undefined && {
      numberPersonsInCharge: changedSocioeconomic.numberPersonsInCharge,
    }),
    ...(changedSocioeconomic.vulnerableProtectionGroupCode !== undefined && {
      vulnerableProtectionGroupCode:
        changedSocioeconomic.vulnerableProtectionGroupCode,
    }),
    ...(changedSocioeconomic.publiclyExposed !== undefined && {
      publiclyExposed: changedSocioeconomic.publiclyExposed,
    }),
    ...(changedSocioeconomic.incomeTax !== undefined && {
      incomeTax: changedSocioeconomic.incomeTax,
    }),
    ...(changedSocioeconomic.publicResourcesAdministration !== undefined && {
      publicResourcesAdministration:
        changedSocioeconomic.publicResourcesAdministration,
    }),
  } as Record<string, unknown>;
};

const mapRequestUpdateDataEntityToApi = (
  updateData: IUpdateDataRequest,
): Record<string, unknown> => {
  const details: Record<string, unknown> = {};

  const personalInformation = mapPersonalInformationEntityToApi(updateData);
  if (personalInformation) {
    details.personalInformation = personalInformation;
  }

  const contactData = mapContactDataEntityToApi(updateData);
  if (contactData) {
    details.contactData = contactData;
  }

  const bankTransferData = mapBankTransferEntityToApi(updateData);
  if (bankTransferData) {
    details.bankTransferData = bankTransferData;
  }

  const financialOperationData = mapFinancialOperationEntityToApi(updateData);
  if (financialOperationData) {
    details.financialOperationData = financialOperationData;
  }

  const socioeconomicInformation =
    mapSocioeconomicInformationEntityToApi(updateData);
  if (socioeconomicInformation) {
    details.socioeconomicInformation = socioeconomicInformation;
  }

  return {
    clientCode: updateData.customerCode,
    details,
    issuer: "Personas",
    requestType: "updatedata",
  };
};

const mapRequestUpdateDataApiToEntity = (
  updateData: Record<string, string | object>,
): IUpdateDataResponse => {
  return {
    cus: String(updateData.cus),
    requestId: String(updateData.productRequestId),
    requestDate: new Date(String(updateData.requestDate)),
    status: String(updateData.status),
  };
};
export {
  mapBankTransferEntityToApi,
  mapContactDataEntityToApi,
  mapFinancialOperationEntityToApi,
  mapPersonalInformationEntityToApi,
  mapRequestUpdateDataApiToEntity,
  mapRequestUpdateDataEntityToApi,
  mapSocioeconomicInformationEntityToApi,
};
