interface IUser {
  id: string;
  identification: string;
  firstName: string;
  secondName: string;
  firstLastName: string;
  secondLastName: string;
  email: string;
  phone: string;
  company: string;
  operator?: {
    name: string;
    logo: string;
  };
}

export type { IUser };
