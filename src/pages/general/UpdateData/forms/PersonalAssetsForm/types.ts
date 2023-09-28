interface IPersonalAssetEntry {
  assetType: string;
  commercialValue: number;
  debtBalance: number;
  financialEntity: string;
  quota: number;
}

interface IPersonalAssetEntries {
  entries: IPersonalAssetEntry[];
}

export type { IPersonalAssetEntries, IPersonalAssetEntry };
