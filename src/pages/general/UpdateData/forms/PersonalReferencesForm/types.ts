interface IPersonalReferenceEntry {
  id?: string;
  referenceType?: string;
  name?: string;
  address?: string;
  email?: string;
  phone?: string;
  city?: string;
}

interface IPersonalReferenceEntries extends IPersonalReferenceEntry {
  entries: IPersonalReferenceEntry[];
}

export type { IPersonalReferenceEntries, IPersonalReferenceEntry };
