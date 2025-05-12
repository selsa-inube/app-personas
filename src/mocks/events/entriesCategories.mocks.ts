import { IEntryCategory } from "@pages/request/events/RegisterInEvent/forms/ChooseEntriesForm/types";

const entriesCategoriesMock: IEntryCategory[] = [
  {
    id: "1",
    name: "General",
    value: 10000,
    subsidyName: "Subsidio General",
    subsidyValue: 5000,
  },
  {
    id: "2",
    name: "Estudiante",
    value: 20000,
    subsidyName: "Subsidio Estudiante",
    subsidyValue: 10000,
  },
  {
    id: "3",
    name: "Adulto Mayor",
    value: 30000,
    subsidyName: "Subsidio Adulto Mayor",
    subsidyValue: 15000,
  },
  {
    id: "4",
    name: "Infante",
    value: 40000,
    subsidyName: "Subsidio Infante",
    subsidyValue: 20000,
  },
];

export { entriesCategoriesMock };
