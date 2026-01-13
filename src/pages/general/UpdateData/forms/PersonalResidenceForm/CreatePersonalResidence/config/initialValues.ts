import { IResidenceDetailsEntry } from "../forms/ResidenceDetailsForm/types";
import { IResidenceTypeEntry } from "../forms/ResidenceTypeForm/types";

interface InitialValuesPersonalResidence {
  residenceType: IResidenceTypeEntry;
  residenceDetails: IResidenceDetailsEntry;
}

const initialValuesPersonalResidence: InitialValuesPersonalResidence = {
  residenceType: {
    type: "",
  },
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
  }
};

export { initialValuesPersonalResidence };