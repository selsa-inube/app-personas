import { ISelectOption } from "@design/input/Select/types";
import { usersMock } from "@mocks/users/users.mocks";
import { reimbursementTypeDM } from "src/model/domains/general/updateData/economicActivity/reimbursementTypeDM";
import { IProduct } from "src/model/entity/product";

const getAccountOptions = (
  disbursementMethod: string,
  savingAccounts: IProduct[],
): ISelectOption[] => {
  const accountOptions: Record<string, ISelectOption[]> = {
    creditToInternalAccount: savingAccounts.map((product) => ({
      id: product.id,
      value: product.description,
    })),
    transferToExternalAccount: usersMock[0] && [
      {
        id: usersMock[0].bankTransfersAccount.accountNumber,
        value: usersMock[0].bankTransfersAccount.description,
      },
    ],
  };
  return accountOptions[disbursementMethod] || [];
};

const getDisbursementMethodOptions = (
  savingAccounts: IProduct[],
): ISelectOption[] => {
  const options: ISelectOption[] = [];

  if (savingAccounts.length > 0) {
    options.push(reimbursementTypeDM.CREDIT_TO_INTERNAL_ACCOUNT);
  }

  if (usersMock[0] && usersMock[0].bankTransfersAccount) {
    options.push(reimbursementTypeDM.TRANSFER_TO_EXTERNAL_ACCOUNT);
  }

  return options;
};

export { getAccountOptions, getDisbursementMethodOptions };
