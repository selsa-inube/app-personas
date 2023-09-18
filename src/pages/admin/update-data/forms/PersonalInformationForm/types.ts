import { ISelectOption } from "@design/input/Select/types";

interface IPersonalInformationEntry {
  firstName: string;
  secondName: string;
  firstLastName: string;
  secondLastName: string;
  identificationType: ISelectOption;
  identification: number;
  expeditionPlace: string;
  expeditionDate: Date;
  birthDate: Date;
  city: string;
  gender: string;
  maritalStatus: string;
  bloodType: string;
}

export type { IPersonalInformationEntry };
