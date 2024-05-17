import { savingsMock } from "@mocks/products/savings/savings.mocks";
import { usersMock } from "@mocks/users/users.mocks";
import { FormikValues } from "formik";
import { reimbursementTypeDM } from "src/model/domains/general/updateData/economicActivity/reimbursementType";
import { EProductType } from "src/model/entity/product";
import { IReimbursementOptions } from "./types";

const optionsFormReimbursement = () => {
  const formReimbursementData: IReimbursementOptions = {
    transferToExternalAccount: usersMock[0] && [
      {
        id: usersMock[0].bankTransfersAccount.description,
        value: usersMock[0].bankTransfersAccount.description,
      },
    ],
    creditToInternalAccount: savingsMock
      .filter((product) => product.type === EProductType.VIEWSAVINGS)
      .map((product) => ({
        id: product.description,
        value: product.description,
      })),
  };
  return formReimbursementData;
};

const filteredOptionsFormReimbursement = () => {
  const detailReimbursement = optionsFormReimbursement();
  return reimbursementTypeDM.options.filter(
    (reimbursementType) =>
      detailReimbursement[reimbursementType.id as keyof IReimbursementOptions]
        ?.length,
  );
};

const buildReimbursementAccount = (formik: FormikValues) => {
  const valueReimbursement = formik.values.reimbursementType;
  return valuesOptionsReimbursement(valueReimbursement);
};

const valuesOptionsReimbursement = (valor: string) => {
  return optionsFormReimbursement()[valor as keyof IReimbursementOptions];
};

export {
  buildReimbursementAccount,
  filteredOptionsFormReimbursement,
  valuesOptionsReimbursement,
};
