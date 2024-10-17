import { disbursementTypeDM } from "src/model/domains/general/disbursementTypeDM";
import { IDisbursementEntry } from "./types";

const mapDisbursement = (): IDisbursementEntry => {
  return {
    disbursements: disbursementTypeDM.options,
    accountNumber: "",
    writeAccountNumber: "",
    observations: "",
    supplier: "",
    identificationType: "",
    identification: "",
    socialReason: "",
    firstName: "",
    secondName: "",
    firstLastName: "",
    secondLastName: "",
    gender: "",
    others: "",
    bankEntity: "",
    bankEntityName: "",
    accountType: "",
  };
};

export { mapDisbursement };
