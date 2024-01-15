import { convertDomainToList, convertDomainToOptions } from "../helper";

const monthlyPayDayData ={
    DAY5:{
        id:"day5",
        value: "Día 5",
    },
    DAY15: {
        id: "day15",
        value: "Día 15",
    },
    DAY30:{
        id:"day30",
        value: "Día 30",
    },    
}

const monthlyPayDayDMValueOf = (id: string) =>
  convertDomainToOptions(monthlyPayDayData).find((city) => city.id === id);

const monthlyPayDayDM = {
  ...monthlyPayDayData,
  list: convertDomainToList(monthlyPayDayData),
  options: convertDomainToOptions(monthlyPayDayData),
  valueOf: monthlyPayDayDMValueOf,
};

export { monthlyPayDayDM };