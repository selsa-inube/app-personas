import { IDomainType } from "@ptypes/domain.types";

interface IDetailsSituationEntry {
  message: string;

  aidId: string;
  aidName: string;
  aidType: IDomainType;
}

export type { IDetailsSituationEntry };
