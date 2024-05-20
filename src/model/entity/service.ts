interface IAid {
  id: string;
  title: string;
  description: string;
}

interface IValidation {
  id: string;
  label: string;
  failDetails: string;
  value: "fail" | "success" | "pending";
  isRequired?: boolean;
}

export type { IAid, IValidation };
