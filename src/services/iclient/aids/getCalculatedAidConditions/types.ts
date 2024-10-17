interface ICalculatedAidConditionsRequest {
  aidId: string;
  beneficiaryId: string;
  userIdentification: string;
}

interface ICalculatedAidConditionsResponse {
  aidLimit: number;
  hasUtilization: boolean;
  utilizationLimit: number;
}

export type {
  ICalculatedAidConditionsRequest,
  ICalculatedAidConditionsResponse,
};
