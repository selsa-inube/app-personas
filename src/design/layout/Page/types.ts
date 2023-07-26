import { ILinks } from "src/components/cards/QuickAccess/types";

interface IHeader{
    logoURL: string;
    username: string;
    client: string; 
}
interface INav{ 
    title: string,
    sections?: Isections;
  }

interface Isections{
    title: string;
    links: ILinks[];
}

  export type {IHeader, INav, Isections};