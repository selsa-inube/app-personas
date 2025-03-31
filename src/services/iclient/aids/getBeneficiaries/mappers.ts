import { convertDomainToOption } from "@utils/domains";
import { relationshipDM } from "src/model/domains/general/updateData/personalResidence/relationshipDM";
import { IBeneficiary } from "src/model/entity/user";

const mapBeneficiaryApiToEntity = (
  beneficiary: Record<string, string | number | object>,
): IBeneficiary => {
  const relationshipDomain = relationshipDM.valueOf(
    String(Object(beneficiary.relationship).code),
  );
  return {
    name: String(beneficiary.customerName || ""),
    identificationType: "C.C",
    identificationNumber: String(beneficiary.customerCode),
    relationship: relationshipDomain
      ? convertDomainToOption(relationshipDomain)
      : undefined,
  };
};

const mapBeneficiariesApiToEntities = (
  beneficiaries: Record<string, string | number | object>[],
): IBeneficiary[] => {
  return beneficiaries.map((beneficiary) =>
    mapBeneficiaryApiToEntity(beneficiary),
  );
};

export { mapBeneficiariesApiToEntities, mapBeneficiaryApiToEntity };
