import { IBeneficiary } from "src/model/entity/user";

const mapBeneficiaryApiToEntity = (
  beneficiary: Record<string, unknown>,
): IBeneficiary => {
  return {
    name: String(beneficiary.customerName || ""),
    identificationType: "C.C",
    identificationNumber: String(beneficiary.customerCode),
    relationshipCode: String(Object(beneficiary.relationship).code || ""),
    relationshipName: String(
      Object(beneficiary.relationship).description || "",
    ),
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
