import { IBeneficiary } from "src/model/entity/user";
import { IDomainType } from "@ptypes/domain.types";

interface IEvaluateAmountsEntry {
    costAid: number;
    daysAid: number;
    aidLimit: number;
    hasUtilization?: boolean;
    utilizationLimit?: number;
    remainingQuota?: number;


    aidId: string;
    aidName: string;
    aidType: IDomainType;
}
enum SimulationState {
    IDLE = 'idle',
    LOADING = 'loading',
    COMPLETED = 'completed'
}

export { SimulationState };
export type { IEvaluateAmountsEntry };