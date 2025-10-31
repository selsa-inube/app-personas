import { IDomainType } from "@ptypes/domain.types";
interface IEvaluateAmountsEntry {
    aidCost: number;
    aidDays: number;
    aidLimit: number;
    hasUtilization?: boolean;
    utilizationLimit?: number;
    remainingQuota?: number;
    calculatedAidValue?: number;

    aidId: string;
    aidName: string;
    aidType: IDomainType;
}

enum ESimulationState {
    IDLE = 'idle',
    LOADING = 'loading',
    COMPLETED = 'completed'
}

export { ESimulationState };
export type { IEvaluateAmountsEntry };