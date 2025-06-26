import { IUpdateDataRequest, IUpdateDataResponse } from "./types";

const getChangedFields = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  current: Record<string, any> = {},
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updated: Record<string, any> = {},
  includesAlways: string[] = [],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Record<string, any> => {
  const result: Record<string, unknown> = {};

  for (const key in updated) {
    if (key === "currentData") continue;

    const updatedValue = updated[key];
    const currentValue = current[key];

    const hasChanged =
      JSON.stringify(updatedValue) !== JSON.stringify(currentValue);

    const mustInclude = includesAlways.includes(key);

    if (hasChanged || mustInclude) {
      result[key] = updatedValue;
    }
  }

  return result;
};
const mapRequestUpdateDataEntityToApi = (
  updateData: IUpdateDataRequest,
): Record<string, unknown> => {
  const changedPersonal = getChangedFields(
    updateData.personalInformation.currentData,
    updateData.personalInformation,
    ["firstName", "secondName", "firstLastName", "secondLastName"],
  );

  const changedContact = getChangedFields(
    updateData.contactData.currentData,
    updateData.contactData,
  );

  const changedBank = getChangedFields(
    updateData.bankTransfers.currentData,
    updateData.bankTransfers,
  );

  const changedFinancial = getChangedFields(
    updateData.financialOperations.currentData,
    updateData.financialOperations,
  );

  const details: Record<string, unknown> = {};

  if (Object.keys(changedPersonal).length > 0) {
    details.personalInformation = {
      ...changedPersonal,
      ...(changedPersonal.identificationType && {
        identificationType: changedPersonal.identificationType.id,
      }),
    };
  }

  if (Object.keys(changedContact).length > 0) {
    details.contactData = {
      ...changedContact,
    };
  }

  if (Object.keys(changedBank).length > 0) {
    const [accountTypeCode = "", accountTypeName = ""] =
      typeof changedBank.accountType === "string"
        ? changedBank.accountType.split("-").map((x: string) => x.trim())
        : [];

    details.bankTransferData = {
      ...(changedBank.bankEntityCode && {
        bankCode: changedBank.bankEntityCode,
      }),
      ...(changedBank.bankEntityName && {
        bankName: changedBank.bankEntityName,
      }),
      ...(changedBank.accountNumber && {
        accountNumber: String(changedBank.accountNumber),
      }),
      ...(changedBank.accountType && {
        accountTypeCode,
        accountTypeName,
      }),
    };
  }

  if (Object.keys(changedFinancial).length > 0) {
    details.financialOperationData = {
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
      ...(changedFinancial.bankEntity && {
        externalAccountBank: changedFinancial.bankEntity,
      }),
      ...(changedFinancial.currency && {
        externalCurrencyAccount: changedFinancial.currency,
      }),
      ...(changedFinancial.accountNumber && {
        externalNumberAccount: changedFinancial.accountNumber,
      }),
    };
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
export { mapRequestUpdateDataApiToEntity, mapRequestUpdateDataEntityToApi };
