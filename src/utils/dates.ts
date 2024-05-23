import { capitalizeText } from "./texts";

const formatPrimaryDate = (date: Date, withTime?: boolean): string => {
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

  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  if (withTime) {
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;

    return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
  } else {
    return `${day}/${month}/${year}`;
  }
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

export { formatPrimaryDate, formatTraceabilityDate, parseSpanishDate };
