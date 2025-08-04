interface ISocioeconomicInformationEntry {
  schoolingLevelCode: string;
  numberPersonsInCharge: string | number;
  vulnerableProtectionGroupCode: string;
  responsibleOfHousehold: string;
  womanHeadOfHousehold: string;
  publiclyExposed: string;
  incomeTax: string;
  publicResourcesAdministration: string;
  currentData?: ISocioeconomicInformationEntry;
}

export type { ISocioeconomicInformationEntry };
