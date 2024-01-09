import { IRate } from "src/model/entity/product";

const programmedSavingsRatesMocks: IRate[] = [
  {
    id: "1-rate",
    deadlineInitialDay: 30,
    deadlineEndDay: 60,
    investmentSquare: "30 - 60 días",
    annualEffectiveRate: "12.45%",
  },
  {
    id: "2-rate",
    deadlineInitialDay: 60,
    deadlineEndDay: 90,
    investmentSquare: "60 - 90 dias",
    annualEffectiveRate: "12.5%",
  },
  {
    id: "3-rate",
    deadlineInitialDay: 90,
    deadlineEndDay: 180,
    investmentSquare: "90 - 180 días",
    annualEffectiveRate: "12.65%",
  },
  {
    id: "4-rate",
    deadlineInitialDay: 180,
    deadlineEndDay: 360,
    investmentSquare: "180 - 360 días",
    annualEffectiveRate: "12.75%",
  },
];

export { programmedSavingsRatesMocks };
