import { getDomainById } from "@mocks/domains/domainService.mocks";
import { savingsMock } from "@mocks/products/savings/savings.mocks";
import { usersMock } from "@mocks/users/users.mocks";
import { FormikValues } from "formik";
import { capitalizeText, replaceWord } from "src/utils/texts";

const reimbursementTypeDM = getDomainById("reimbursementType");

const formReimbursement = (formik: FormikValues) => {
  const valueReimbursement = formik.values.reimbursementType;
  if (valueReimbursement === "transferToExternalAccount") {
    const bankEntity =  capitalizeText(usersMock[0].bankTransfersAccount.bankEntity.toLowerCase()) 
    const accountType = usersMock[0].bankTransfersAccount.accountType
    const accountTypeSpanish = replaceWord(
      accountType,
      "savingsAccount",
      "Ahorros"
    );
    const truncatedAccountNumber = String(
      usersMock[0].bankTransfersAccount.accountNumber
    ).slice(-4);
    return `${bankEntity} - ${accountTypeSpanish} - **${truncatedAccountNumber}`;
  }
  if (valueReimbursement === "creditToInternalAccount") {
    return savingsMock[1].description;
  }
  return "";
};

export { reimbursementTypeDM, formReimbursement };
