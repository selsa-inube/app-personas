import { convertDomainToOption } from "@utils/domains";
import { relationshipDM } from "src/model/domains/general/updateData/personalResidence/relationshipDM";
import { IBeneficiary } from "src/model/entity/user";

const mapBeneficiaryApiToEntity = (
  beneficiary: Record<string, unknown>,
): IBeneficiary => {
  const relationship = beneficiary.relationship;

  let code = "";

  if (
    typeof relationship === "object" &&
    relationship !== null &&
    "code" in relationship &&
    typeof (relationship as Record<string, unknown>).code === "string"
  ) {
    code = (relationship as Record<string, string>).code;
  }

  const id = codeToIdMap[code];
  const relationshipDomain = id ? relationshipDM.valueOf(id) : undefined;

  return {
    name: String(beneficiary.customerName || ""),
    identificationType: "C.C",
    identificationNumber: String(beneficiary.customerCode || ""),
    relationship: relationshipDomain ? convertDomainToOption(relationshipDomain) : undefined,
  };
};

const mapBeneficiariesApiToEntities = (
  beneficiaries: Record<string, string | number | object>[],
): IBeneficiary[] => {
  return beneficiaries.map((beneficiary) =>
    mapBeneficiaryApiToEntity(beneficiary),
  );
};

const codeToIdMap: Record<string, string> = {
  'M': 'Mother',
  'P': 'Father',
  'F': 'ParentAdoptive',
  'H': 'Son',
  'C': 'Spouse',
  'A': 'Grandfather',
  'E': 'Brother',
  'S': 'FatherInLaw',
  'T': 'Uncle',
  'R': 'Cousin',
  'W': 'Nanny',
  '2': 'Stepson',
  'I': 'BindingEntity',
  'O': 'Others',
  'J': 'SonAdopted',
  '5': 'Stepfather',
  '9': 'GreatFrandson',
  'X': 'BeneficiaryByPercentageDifferentialForRelief',
  'B': 'Nephew',
  'D': 'Associate',
  '7': 'DaughterInLaw',
  '8': 'GreatGrandfather',
  '0': 'GrandpaUncle',
  '1': 'ChildFoster',
  '6': 'SonInLaw',
  '3': 'Stepbrother',
  'L': 'MotherAdoptive',
  'V': 'ThirdPartyBeneficiaryNonFamily',
  'Y': 'EmployeeDomestic',
  'Z': 'PermanentPartner',
  '4': 'ParentFoster',
  'N': 'Grandson',
  'U': 'BrotherInLaw',
};

export { mapBeneficiariesApiToEntities, mapBeneficiaryApiToEntity };
