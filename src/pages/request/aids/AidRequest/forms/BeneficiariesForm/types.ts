import { IBeneficiary } from "src/model/entity/user";

interface IBeneficiariesEntry {
  beneficiaries: ({
    selected: boolean;
  } & IBeneficiary)[];
}

export type { IBeneficiariesEntry };
