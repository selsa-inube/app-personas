interface IBeneficiariesEntry {
  beneficiaries: {
    id: string;
    name: string;
    percentage?: number;
  }[];
  totalPercentage: number;
}

export type { IBeneficiariesEntry };
