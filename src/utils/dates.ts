import { capitalizeText } from "./texts";

const formatPrimaryDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  const dateString = date.toLocaleDateString("es-ES", options);

  const [day, month, year] = dateString.split(" ");

  return `${day}/${capitalizeText(month)}/${year}`;
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
  const spanishMonths: { [key: string]: string } = {
    Ene: "Jan",
    Feb: "Feb",
    Mar: "Mar",
    Abr: "Apr",
    May: "May",
    Jun: "Jun",
    Jul: "Jul",
    Ago: "Aug",
    Sep: "Sep",
    Oct: "Oct",
    Nov: "Nov",
    Dic: "Dec",
  };

  const [day, month, year] = spanishDate.split("/");

  const englishMonth = spanishMonths[month];

  return new Date(`${day}/${englishMonth}/${year}`);
};

export { formatPrimaryDate, formatTraceabilityDate, parseSpanishDate };
