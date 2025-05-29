import { IBeneficiary } from "src/model/entity/user";

const mapBeneficiaryApiToEntity = (
  beneficiary: Record<string, string | number | object>,
): IBeneficiary => {
  return {
    name: String(beneficiary.customerName || ""),
    identificationType: "C.C",
    identificationNumber: String(beneficiary.customerCode),
    relationship: String(Object(beneficiary.relationship).code),
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
