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

  const [weekday, day, of1, month, of2, year, time] = dateString.split(" ");

  return `${capitalizeText(weekday)} ${day} de ${capitalizeText(
    month
  )} de ${year} ${time} ${ampm}`;
};

export { formatPrimaryDate, formatTraceabilityDate };
