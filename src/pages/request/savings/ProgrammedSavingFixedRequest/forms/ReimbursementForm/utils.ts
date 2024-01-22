import { savingsMock } from "@mocks/products/savings/savings.mocks";
import { usersMock } from "@mocks/users/users.mocks";
import { FormikValues } from "formik";
import { reimbursementTypeDM } from "src/model/domains/economicActivity/reimbursementType";
import { IFormReimbursement } from "./types";

const optionsFormReimbursement = () => {
  const formReimbursementData: IFormReimbursement = {
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
  return formReimbursementData;
};

const filteredOptionsFormReimbursement = () => {
  const detailReimbursement = Object(optionsFormReimbursement());
  return reimbursementTypeDM.options.filter(
    (reimbursementType) =>
      detailReimbursement[reimbursementType.id] &&
      detailReimbursement[reimbursementType.id].length > 0,
  );
};

const buildReimbursementAccount = (formik: FormikValues) => {
  const valueReimbursement = formik.values.reimbursementType;
  return valuesOptionsReimbursement(valueReimbursement);
};

const valuesOptionsReimbursement = (valor: string) => {
  return Object(optionsFormReimbursement())[valor];
};

export {
  buildReimbursementAccount,
  filteredOptionsFormReimbursement,
  valuesOptionsReimbursement,
};
