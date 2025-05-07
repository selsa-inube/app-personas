import { IEntry } from "@design/data/Table/types";
import { IFamilyGroupEntry } from "../types";

const mapFamilyGroupTable = (entries: IFamilyGroupEntry[]): IEntry[] => {
  return entries.map((entry) => ({
    ...entry,
    id: entry.id || "",
    relationship: entry.relationship,
    fullName: `${entry.firstName} ${entry.secondName} ${entry.firstLastName} ${entry.secondLastName}`,
  }));
};

export { mapFamilyGroupTable };
