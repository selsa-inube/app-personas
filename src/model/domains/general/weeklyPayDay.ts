import { convertDomainToList, convertDomainToOptions } from "../helper";

const weeklyPayDayData ={
    MONDAY:{
        id:"monday",
        value: "Lunes",
    },
    TUESDAY: {
        id: "tuesday",
        value: "Martes",
    },
    WEDNESDAY:{
        id:"wednesday",
        value: "Miércoles",
    },
    THURSDAY:{
        id: "thursday",
        value: "Jueves",
    },
    FRIDAY:{
        id:"friday",
        value: "Viernes",
    },
    SATURDAY:{
        id: "saturday",
        value: "Sabado",
    }
    
}

const weeklyPayDayDMValueOf = (id: string) =>
  convertDomainToOptions(weeklyPayDayData).find((city) => city.id === id);

const weeklyPayDayDM = {
  ...weeklyPayDayData,
  list: convertDomainToList(weeklyPayDayData),
  options: convertDomainToOptions(weeklyPayDayData),
  valueOf: weeklyPayDayDMValueOf,
};

export { weeklyPayDayDM };