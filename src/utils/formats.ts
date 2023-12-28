import { FormikValues } from "formik";

const currencyFormat = (price: number): string => {
  if (price === 0) {
    return "$ 0.00";
  }

  return Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(price);
};

const parseCurrencyString = (currencyString: string): number => {
  if (currencyString === "$ 0.0") {
    return NaN;
  }

  let num = parseInt(currencyString.replace(/\$|\./g, ""));
  return num;
};

const truncateAndObfuscateDescription = (
  description: string,
  type: string,
  lengthToShow: number
) => {
  if (type === "CA") {
    const truncatedText = description.slice(-lengthToShow);
    return "**" + truncatedText;
  } else {
    return description;
  }
};

const validateCurrencyField = (fieldName: string, formik: FormikValues) => {
  return typeof formik.values[fieldName] === "number"
    ? currencyFormat(formik.values[fieldName])
    : "";
};

const handleChangeWithCurrency = (
  formik: FormikValues,
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const parsedValue = parseCurrencyString(e.target.value);
  formik.setFieldValue(e.target.name, isNaN(parsedValue) ? "" : parsedValue);
};

const capitalizeText = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

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

export {
  currencyFormat,
  formatPrimaryDate,
  handleChangeWithCurrency,
  parseCurrencyString,
  truncateAndObfuscateDescription,
  validateCurrencyField,
};
