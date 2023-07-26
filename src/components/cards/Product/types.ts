interface IAttribute {
  id: string;
  label: string;
  value: string;
}

interface ITag {
  label: string;
  appearance: string;
}

export type { ITag, IAttribute };
