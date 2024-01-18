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

  return parseInt(currencyString.replace(/\$|\./g, ""));
};

const validateCurrencyField = (fieldName: string, formik: FormikValues) => {
  return typeof formik.values[fieldName] === "number"
    ? currencyFormat(formik.values[fieldName])
    : "";
};

const handleChangeWithCurrency = (
  formik: FormikValues,
  e: React.ChangeEvent<HTMLInputElement>,
) => {
  const parsedValue = parseCurrencyString(e.target.value);
  formik.setFieldValue(e.target.name, isNaN(parsedValue) ? "" : parsedValue);
};

export {
  currencyFormat,
  handleChangeWithCurrency,
  parseCurrencyString,
  validateCurrencyField,
};
