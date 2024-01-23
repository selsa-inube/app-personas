import { ISelectOption } from "@design/input/Select/types";
import { savingsMock } from "@mocks/products/savings/savings.mocks";
import { usersMock } from "@mocks/users/users.mocks";
import { FormikValues } from "formik";
import { reimbursementTypeDM } from "src/model/domains/economicActivity/reimbursementType";
import { IReimbursementOptions } from "./types";

const optionsFormReimbursement = () => {
  let valuesUserMock: ISelectOption = { id: "", value: "" };

  if (usersMock[0]) {
    valuesUserMock = {
      id: usersMock[0].bankTransfersAccount.description,
      value: usersMock[0].bankTransfersAccount.description,
    };
  }
  const formReimbursementData: IReimbursementOptions = {
    transferToExternalAccount: [valuesUserMock],
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
  const detailReimbursement = optionsFormReimbursement();
  return reimbursementTypeDM.options.filter(
    (reimbursementType) =>
      detailReimbursement[
        reimbursementType.id as keyof IReimbursementOptions
      ] &&
      detailReimbursement[reimbursementType.id as keyof IReimbursementOptions]
        .length > 0,
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
