import * as Yup from "yup";
import { regex } from "./regularExpressions";
import { validationMessages } from "./validationMessages";

const validationRules = {
  name: Yup.string()
    .matches(regex.onlyLetters, validationMessages.onlyLetters)
    .min(2, validationMessages.minCharacters(2))
    .max(30, validationMessages.maxCharacters(30)),

  identification: Yup.string()
    .test(
      "valid-identification",
      validationMessages.identification,
      (value) => typeof value !== "undefined"
    )
    .min(5, validationMessages.minNumbers(5))
    .max(15, validationMessages.maxNumbers(15)),

  phone: Yup.string()
    .matches(regex.onlyNumbers, validationMessages.phone)
    .min(10, validationMessages.minNumbers(10))
    .max(10, validationMessages.maxNumbers(10)),

  email: Yup.string()
    .matches(regex.emailFormat, validationMessages.email)
    .min(8, validationMessages.minCharacters(8))
    .max(80, validationMessages.maxCharacters(80)),

  password: Yup.string()
    .matches(regex.passwordFormat, validationMessages.password)
    .min(8, validationMessages.minCharacters(8))
    .max(30, validationMessages.maxCharacters(30)),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], validationMessages.passwordMatch)
    .min(8, validationMessages.minCharacters(8))
    .max(30, validationMessages.maxCharacters(30)),

  date: Yup.string()
    .matches(regex.date, validationMessages.date)
    .min(11, validationMessages.minCharacters(11))
    .max(11, validationMessages.maxCharacters(11)),

  notPastDate: Yup.string().test(
    "is-not-past-date",
    validationMessages.notPastDate,
    (value) => {
      if (!value) return true;

      const today = new Date();
      const date = new Date(value);
      return date >= today;
    }
  ),

  money: Yup.number()
    .min(1, validationMessages.minCurrencyNumbers(1))
    .max(1000000000, validationMessages.maxCurrencyNumbers(1000000000)),
  expeditionDate: Yup.string()
    .matches(regex.date, validationMessages.date)
    .min(11, validationMessages.minCharacters(11))
    .max(11, validationMessages.maxCharacters(11)),

  country: Yup.string()
    .matches(regex.onlyLetters, validationMessages.country)
    .min(3, validationMessages.minCharacters(3))
    .max(25, validationMessages.maxCharacters(25)),

  stateOrDepartment: Yup.string()
    .matches(regex.onlyLetters, validationMessages.stateOrDepartment)
    .max(25, validationMessages.maxCharacters(25)),

  city: Yup.string()
    .matches(regex.onlyLetters, validationMessages.city)
    .max(25, validationMessages.maxCharacters(25)),

  postalCode: Yup.string()
    .matches(regex.onlyNumbers, validationMessages.postalCode)
    .min(5, validationMessages.minNumbers(5))
    .max(10, validationMessages.maxNumbers(10)),

  landlinePhone: Yup.string()
    .matches(regex.onlyNumbers, validationMessages.landlinePhone)
    .min(8, validationMessages.minNumbers(8))
    .max(10, validationMessages.maxNumbers(10)),

  address: Yup.string()
    .min(5, validationMessages.minCharacters(5))
    .max(100, validationMessages.maxCharacters(100)),

  accountNumber: Yup.string()
    .matches(regex.onlyNumbers)
    .min(11, validationMessages.minNumbers(11))
    .max(11, validationMessages.maxNumbers(11)),

  dependants: Yup.string()
    .matches(regex.onlyNumbers, validationMessages.onlyNumbers)
    .min(1, validationMessages.minNumbers(1))
    .max(2, validationMessages.maxNumbers(2)),
};

export { validationRules };
