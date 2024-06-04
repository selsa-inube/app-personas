import { TagProps } from "@design/data/Tag";

interface ITransfer {
  id: string;
  title: string;
  destination: string;
  value: number;
  origin: string;
  date: Date;
  tag: TagProps;
}

export type { ITransfer };
