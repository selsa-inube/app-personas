interface ISocioeconomicInformationEntry {
  educationLevel: string;
  dependants: string;
  vulnerablePopulation: string;
  isResponsibleHome: string;
  isSingleMother: string;
  isPublicExposed: string;
  isDeclaredIncomes: string;
  isPublicOfficials: string;
  currentData?: ISocioeconomicInformationEntry;
}

export type { ISocioeconomicInformationEntry };
