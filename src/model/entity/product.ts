import { TagProps } from "@design/data/Tag";

interface IAttribute {
  id: string;
  label: string;
  value: number | string | IAttribute[];
}

enum EMovementType {
  PURCHASE = "PURCHASE",
  REVERSE = "REVERSE",
  PAYMENT = "PAYMENT",
}

interface IMovement {
  id: string;
  date: Date;
  reference?: string;
  description: string;
  capitalPayment?: number;
  interest?: number;
  lifeInsurance?: number;
  patrimonialInsurance?: number;
  capitalization?: number;
  commission?: number;
  totalValue: number;
  cardNumber?: string;
  sequence?: string;
  quotas?: string;
  type?: EMovementType;
}

interface IAmortization {
  id: string;
  date: Date;
  type: string;
  capitalPayment?: number;
  interest: number;
  lifeInsurance?: number;
  patrimonialInsurance?: number;
  capitalization?: number;
  others: number;
  totalMonthlyValue: number;
  projectedBalance: number;
}
enum ECommitmentType {
  SAVINGSPROGRAMMED = "SAVINGSPROGRAMMED",
  QUOTAESTATUTORY = "QUOTAESTATUTORY",
}

interface ICommitment {
  id: string;
  title: string;
  type: ECommitmentType;
  description?: string;
  attributes: IAttribute[];
  movements?: IMovement[];
  tag?: TagProps;
  products: string[];
}

enum EProductType {
  PROGRAMMEDSAVINGS = "PROGRAMMEDSAVINGS",
  PERMANENTSAVINGS = "PERMANENTSAVINGS",
  CONTRIBUTIONS = "CONTRIBUTIONS",
  CDAT = "CDAT",
  VIEWSAVINGS = "VIEWSAVINGS",
  CREDIT = "TRADITIONALINDIVIDUALDISBURSEMENT",
  CREDITCARD = "CREDITCARDREVOLVINGCREDIT",
}

interface IProduct {
  id: string;
  title: string;
  description: string;
  type: EProductType;
  attributes: IAttribute[];
  movements?: IMovement[];
  amortization?: IAmortization[];
  tags?: TagProps[];
  commitments?: string[];
  quotaDetails?: string[];
  consumptions?: string[];
}

interface IRate {
  id: string;
  deadlineInitialDay: number;
  deadlineEndDay: number;
  investmentSquare: string;
  annualEffectiveRate: string;
}

export { ECommitmentType, EProductType, EMovementType };

export type {
  IAmortization,
  IAttribute,
  ICommitment,
  IMovement,
  IProduct,
  IRate,
};
