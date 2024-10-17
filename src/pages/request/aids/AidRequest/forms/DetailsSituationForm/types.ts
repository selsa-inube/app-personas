import { IDomainType } from "@ptypes/domain.types";

interface IDetailsSituationEntry {
  quotaAvailable?: number;
  applicationValue?: number;
  daysAvailable?: number;
  applicationDays?: number;
  message: string;

  aidId: string;
  aidName: string;
  aidType: IDomainType;
}

export type { IDetailsSituationEntry };
