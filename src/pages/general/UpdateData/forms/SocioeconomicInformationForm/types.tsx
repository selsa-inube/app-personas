interface ISocioeconomicInformationEntry {
  schoolingLevelCode: string;
  numberPersonsInCharge: string;
  vulnerableProtectionGroupCode: string;
  responsibleOfHousehold: string;
  womanHeadOfHousehold: string;
  publiclyExposed: string;
  incomeTax: string;
  publicResourcesAdministration: string;
  currentData?: ISocioeconomicInformationEntry;
}

export type { ISocioeconomicInformationEntry };
