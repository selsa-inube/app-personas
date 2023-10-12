interface IPreliquidationEntry {
  amount: number;
  advanceInterestAdjustmentCycle: number;
  chargesAndDiscounts: number;
  netValueToSend: number;
}

export type { IPreliquidationEntry };
