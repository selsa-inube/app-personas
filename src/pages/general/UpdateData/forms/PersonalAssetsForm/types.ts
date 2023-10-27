interface IPersonalAssetEntry {
  id?: string;
  assetName?: string;
  commercialValue?: string;
  debtBalance?: string;
  financialEntity?: string;
  quota?: string;
  observations?: string;
}

interface IPersonalAssetEntries extends IPersonalAssetEntry {
  entries: IPersonalAssetEntry[];
}

export type { IPersonalAssetEntries, IPersonalAssetEntry };
