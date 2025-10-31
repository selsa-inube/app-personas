import { IDomainType } from "@ptypes/domain.types";
interface IEvaluateAmountsEntry {
    aidCost: number;
    aidDays: number;
    aidLimit: number;
    hasUtilization?: boolean;
    utilizationLimit?: number;
    remainingQuota?: number;


    aidId: string;
    aidName: string;
    aidType: IDomainType;
}

enum SimulationStateType {
    IDLE = 'idle',
    LOADING = 'loading',
    COMPLETED = 'completed'
}

export { SimulationStateType };
export type { IEvaluateAmountsEntry };