import { getDomainById } from "@mocks/domains/domainService.mocks";
import { savingsMock } from "@mocks/products/savings/savings.mocks";
import { usersMock } from "@mocks/users/users.mocks";
import { FormikValues } from "formik";

const reimbursementTypeDM = getDomainById("reimbursementType");

const buildReimbursementAccount = (formik: FormikValues) => {
  const valueReimbursement = formik.values.reimbursementType;
  if (valueReimbursement === "transferToExternalAccount") {
    return usersMock[0].bankTransfersAccount.description;
  }
  if (valueReimbursement === "creditToInternalAccount") {
    return savingsMock[1].description;
  }
  return "";
};

export { buildReimbursementAccount, reimbursementTypeDM };
