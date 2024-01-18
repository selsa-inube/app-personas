import { savingsMock } from "@mocks/products/savings/savings.mocks";
import { usersMock } from "@mocks/users/users.mocks";
import { FormikValues } from "formik";
import { reimbursementTypeDM } from "src/model/domains/economicActivity/reimbursementType";
import { IFormReimbursement } from "./types";

const buildReimbursementAccount = (formik: FormikValues) => {
  const valueReimbursement = formik.values.reimbursementType;
  return Object(formReimbursement())[valueReimbursement];
};

const formReimbursement = () => {
  const optionsFormReimbursement: IFormReimbursement = {
    transferToExternalAccount: usersMock.map((dataUser) => {
      return {
        id: dataUser.bankTransfersAccount.description,
        value: dataUser.bankTransfersAccount.description,
      };
    }),
    creditToInternalAccount: savingsMock
      .filter((product) => product.type === "CA")
      .map((product) => ({
        id: product.description,
        value: product.description,
      })),
  };
  return optionsFormReimbursement;
};

const filteredFormReimbursement = () => {
  const detailReimbursement = Object(formReimbursement());
  return reimbursementTypeDM.options.filter(
    (reimbursementType) =>
      detailReimbursement[reimbursementType.id] &&
      detailReimbursement[reimbursementType.id].length > 0
  );
};

export { buildReimbursementAccount, filteredFormReimbursement };
