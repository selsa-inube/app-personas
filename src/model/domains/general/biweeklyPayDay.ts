import { convertDomainToList, convertDomainToOptions } from "../helper";

const biweeklyPayDayData ={
    BIWEEKLYONE:{
        id:"biweeklyOne",
        value: "Quincena 01 del mes",
    },
    BIWEEKLYTWO: {
        id: "biweeklyTwo",
        value: "Quincena 02 del mes",
    },    
}

const biweeklyPayDayDMValueOf = (id: string) =>
  convertDomainToOptions(biweeklyPayDayData).find((city) => city.id === id);

const biweeklyPayDayDM = {
  ...biweeklyPayDayData,
  list: convertDomainToList(biweeklyPayDayData),
  options: convertDomainToOptions(biweeklyPayDayData),
  valueOf: biweeklyPayDayDMValueOf,
};

export { biweeklyPayDayDM };