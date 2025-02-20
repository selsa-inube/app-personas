import { IPersonalInformationEntry } from "@pages/general/UpdateData/forms/PersonalInformationForm/types";

interface IUpdateDataRequest {
  customerCode: string;
  personalInformation: IPersonalInformationEntry;
}

interface IUpdateDataResponse {
  cus: string;
  requestId: string;
  requestDate: Date;
  status: string;
}

export type { IUpdateDataRequest, IUpdateDataResponse };
