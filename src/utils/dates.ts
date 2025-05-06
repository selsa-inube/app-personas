import { DateType, TimestampType } from "@ptypes/date.types";
import { capitalizeText } from "./texts";

const formatPrimaryTimestamp = (
  date: TimestampType,
  withTime?: boolean,
): string => {
  const months = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];

  const day = date.getDate().toString().padStart(2, "0");
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  if (withTime) {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;

    return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
  } else {
    return `${day}/${month}/${year}`;
  }
};

const formatPrimaryDate = (date: DateType): string => {
  const newDate = new Date(new Date(date).toISOString().replace("Z", ""));

  const months = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];

  const day = newDate.getDate().toString().padStart(2, "0");
  const month = months[newDate.getMonth()];
  const year = newDate.getFullYear();

  return `${day}/${month}/${year}`;
};

const formatTraceabilityDate = (date: Date) => {
  const hours = date.getHours();
  const ampm = hours >= 12 ? "PM" : "AM";

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  const dateString = date
    .toLocaleDateString("es-ES", options)
    .replaceAll(",", "")
    .replaceAll(".", "");

  const [weekday, day, , month, , year, time] = dateString.split(" ");

  return `${capitalizeText(weekday)} ${day} de ${capitalizeText(
    month,
  )} de ${year} ${time} ${ampm}`;
};

const formatLetterDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  const dateString = date
    .toLocaleDateString("es-ES", options)
    .replaceAll(",", "")
    .replaceAll(".", "");

  const [weekday, day, , month, , year] = dateString.split(" ");

  return `${capitalizeText(weekday)}, ${day} de ${month} de ${year}`;
};

// Parse date string in format dd/mm/yyyy to Date object
const parseSpanishDate = (spanishDate: string) => {
  const spanishMonths: { [key: string]: number } = {
    Ene: 0,
    Feb: 1,
    Mar: 2,
    Abr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Ago: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dic: 11,
  };

  const [day, month, year] = spanishDate.split("/");

  const numberMonth = spanishMonths[month];

  return new Date(parseInt(year), numberMonth, parseInt(day));
};

const formatSecondaryDate = (date: Date, withTime?: boolean): string => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  if (withTime) {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;

    return `${day}-${month}-${year}-${hours}-${minutes}-${ampm}`;
  } else {
    return `${day}-${month}-${year}`;
  }
};

const formatRequestDate = (date?: string | Date): string => {
  if (!date) return "";
  const parsedDate = new Date(date);
  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getDayInSpanish = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = { weekday: "long" };
  return capitalizeText(date.toLocaleDateString("es-ES", options));
};

const getAbbreviatedMonthInSpanish = (date: Date, numberOfLetters: number) => {
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
  };
  const month = date.toLocaleDateString("es-ES", options);
  return month.substring(0, numberOfLetters).toUpperCase();
};

const getHourWithAmPm = (date: Date): string => {
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  return `${hours}:${minutes} ${ampm}`;
};

export {
  formatLetterDate,
  formatPrimaryDate,
  formatPrimaryTimestamp,
  formatRequestDate,
  formatSecondaryDate,
  formatTraceabilityDate,
  getAbbreviatedMonthInSpanish,
  getDayInSpanish,
  parseSpanishDate,
  getHourWithAmPm,
};

export type { DateType, TimestampType };
