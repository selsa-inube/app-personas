import { convertDomainToOptions, convertDomainToList } from "src/utils/domains";

const reimbursementTypeData = {
  CREDIT_TO_INTERNAL_ACCOUNT: {
    id: "creditToInternalAccount",
    value: "Abono a cuenta interna",
  },
  TRANSFER_TO_EXTERNAL_ACCOUNT: {
    id: "transferToExternalAccount",
    value: "Transferencia a cuenta externa",
  },
};

const reimbursementTypeDMValueOf = (id: string) =>
  convertDomainToOptions(reimbursementTypeData).find(
    (reimbursementType) => reimbursementType.id === id,
  );

const reimbursementTypeDM = {
  ...reimbursementTypeData,
  list: convertDomainToList(reimbursementTypeData),
  options: convertDomainToOptions(reimbursementTypeData),
  valueOf: reimbursementTypeDMValueOf,
};

export { reimbursementTypeDM };
