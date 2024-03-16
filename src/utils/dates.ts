import { capitalizeText } from "./texts";

const formatPrimaryDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  };
  const dateString = date.toLocaleDateString("es-ES", options);

  const [day, month, year] = dateString.split(" ");

  return `${day}/${capitalizeText(month)}/${year}`;
};

const formatPrimaryDateWithTime = (date: Date) => {
  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  const dateFormatter = new Intl.DateTimeFormat("es-ES", dateOptions);

  const dateString = dateFormatter.format(date);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const period = hours >= 12 ? "pm" : "am";
  const hour = hours % 12 || 12;
  const minute = minutes < 10 ? `0${minutes}` : minutes;

  const timeString = `${hour}:${minute} ${period}`;

  const [day, month, year] = dateString.split(" ");

  return `${day}/${capitalizeText(month)}/${year} ${timeString}`;
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

export {
  formatPrimaryDate,
  formatTraceabilityDate,
  parseSpanishDate,
  formatPrimaryDateWithTime,
};
