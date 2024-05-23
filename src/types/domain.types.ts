interface IServerDomain {
  id: string;
  value: string;
  description?: string;
}

interface IDomainType {
  id: string;
  value: string;
}

export type { IServerDomain, IDomainType };
