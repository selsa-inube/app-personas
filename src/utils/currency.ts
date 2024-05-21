import { FormikValues } from "formik";

const currencyFormat = (price: number, withCurrencySymbol = true): string => {
  if (price === 0) {
    if (withCurrencySymbol) return "$ 0";
    return "0";
  }

  const value = Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(price);

  return withCurrencySymbol ? value : value.replace(/\$/g, "");
};

const parseCurrencyString = (currencyString: string): number => {
  if (currencyString === "$ 0") {
    return NaN;
  }

  return parseInt(currencyString.replace(/\$|\./g, ""));
};

const validateCurrencyField = (
  fieldName: string,
  formik: FormikValues,
  withCurrencySymbol = true,
) => {
  return typeof formik.values[fieldName] === "number"
    ? currencyFormat(formik.values[fieldName], withCurrencySymbol)
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
