import { IRate } from "src/model/entity/product";

const investmentsRatesMocks:IRate[] = [
  {
    id:"1-rate",
    deadlineInitialDay: 30,
    deadlineEndDay: 59,
    investmentSquare: "30 - 59 días",
    AnnualEffectiveRate: "12.40%",
  },
  {
    id:"2-rate",
    deadlineInitialDay: 60,
    deadlineEndDay: 89,
    investmentSquare: "60 - 89 dias",
    AnnualEffectiveRate: "12.40%",
  },
  {
    id:"3-rate",
    deadlineInitialDay: 90,
    deadlineEndDay: 119,
    investmentSquare: "90 - 119 días",
    AnnualEffectiveRate: "12.40%",
  },
  {
    id:"4-rate",
    deadlineInitialDay: 120,
    deadlineEndDay: 149,
    investmentSquare: "120 - 149 días",
    AnnualEffectiveRate: "12.45%",
  },
  {
    id:"5-rate",
    deadlineInitialDay: 150,
    deadlineEndDay: 179,
    investmentSquare: "150 - 179 días",
    AnnualEffectiveRate: "12.55%",
  },
  {
    id:"6-rate",
    deadlineInitialDay: 180,
    deadlineEndDay: 239,
    investmentSquare: "180 - 239 días",
    AnnualEffectiveRate: "12.65%",
  },
  {
    id:"7-rate",
    deadlineInitialDay: 240,
    deadlineEndDay: 359,
    investmentSquare: "240 - 359 días",
    AnnualEffectiveRate: "12.70%",
  },
  {
    id:"8-rate",
    deadlineInitialDay: 360,
    deadlineEndDay: 539,
    investmentSquare: "360 -  539 días",
    AnnualEffectiveRate: "12.75%",
  },
  {
    id:"9-rate",
    deadlineInitialDay: 540,
    deadlineEndDay: 719,
    investmentSquare: "540 - 719 días",
    AnnualEffectiveRate: "12.10%",
  },
];

export { investmentsRatesMocks };
