interface IPersonalAssetEntry {
  id?: string;
  assetType?: string;
  commercialValue?: number;
  debtBalance?: number;
  financialEntity?: string;
  quota?: number;
  observations?: string;
}

interface IPersonalAssetEntries extends IPersonalAssetEntry {
  entries: IPersonalAssetEntry[];
}

export type { IPersonalAssetEntries, IPersonalAssetEntry };
