import { IEntry } from "@design/data/Table/types";
import { IFamilyGroupEntry } from "../types";
import { relationshipDM } from "src/model/domains/personalResidence/relationshipdm";

const mapFamilyGroupTable = (entries: IFamilyGroupEntry[]): IEntry[] => {
  return entries.map((entry) => ({
    ...entry,
    id: entry.id || "",
    relationship:
      entry.relationship !== undefined
        ? relationshipDM.valueOf(entry.relationship)?.value
        : "",
    fullName: `${entry.firstName} ${entry.secondName} ${entry.firstLastName} ${entry.secondLastName}`,
  }));
};

export { mapFamilyGroupTable };
