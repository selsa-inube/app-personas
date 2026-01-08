import { IResidenceDetailsEntry } from "../forms/ResidenceDetailsForm/types";
import { IResidenceTypeEntry } from "../forms/ResidenceTypeForm/types";

export const initialValuesPersonalResidence = {
  residenceType: {
    type: "",
  } as IResidenceTypeEntry,
  residenceDetails: {
    stratum: "",
    bankEntityCode: "",
    bankEntityName: "",
    dueDate: "",
    landlordName: "",
    landlordPhone: "",
    ownerName: "",
    relationship: "",
    ownerPhone: "",
    otherType: "",
  } as IResidenceDetailsEntry,
};
