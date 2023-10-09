interface ISimulationEntry {
  creditDestination: string;
  product: string;
  simulationWithQuota: boolean;
  amount: string;
  peridiocity: string;
  deadline: string;
}

interface ISimulatedCreditState {
  quota: number;
  cycleInterest: number;
  netValue: number;
}

export type { ISimulatedCreditState, ISimulationEntry };
