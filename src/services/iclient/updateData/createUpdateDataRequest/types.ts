import { IBankTransfersEntry } from "@pages/general/UpdateData/forms/BankTransfersForm/types";
import { IContactDataEntry } from "@pages/general/UpdateData/forms/ContactDataForm/types";
import { IFinancialOperationsEntry } from "@pages/general/UpdateData/forms/FinancialOperationsForm/types";
import { IPersonalInformationEntry } from "@pages/general/UpdateData/forms/PersonalInformationForm/types";

interface IUpdateDataRequest {
  customerCode: string;
  personalInformation: IPersonalInformationEntry;
  contactData: IContactDataEntry;
  bankTransfers: IBankTransfersEntry;
  financialOperations: IFinancialOperationsEntry;
}

interface IUpdateDataResponse {
  cus: string;
  requestId: string;
  requestDate: Date;
  status: string;
}

export type { IUpdateDataRequest, IUpdateDataResponse };
