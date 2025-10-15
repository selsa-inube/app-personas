interface ICalculatedAidConditionsRequest {
  aidCode: string;
  beneficiaryPublicCode: string;
  customerPublicCode: string;
  aidValue: number;
}

interface ICalculatedAidConditionsResponse {
  aidLimit: number;
  hasUtilization: boolean;
  utilizationLimit: number;
  aidValue: number;
  remainingQuota: number;
}

export type {
  ICalculatedAidConditionsRequest,
  ICalculatedAidConditionsResponse,
};
