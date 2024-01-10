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

  notPastDate: Yup.string()
    .matches(regex.date, validationMessages.date)
    .min(11, validationMessages.minCharacters(11))
    .max(11, validationMessages.maxCharacters(11))
    .test("is-not-past-date", validationMessages.notPastDate, (value) => {
      if (!value) return true;

      const months: { [key: string]: number } = {
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

      const dateDivider = value.split("/");
      const monthAbbrev = dateDivider[1];
      const monthNumber = months[monthAbbrev];
      const year = parseInt(dateDivider[2]);
      const day = parseInt(dateDivider[0]);

      const date = new Date(year, monthNumber, day);
      const today = new Date();

      return date >= today;
    }),

  money: Yup.number()
    .min(1, validationMessages.minCurrencyNumbers(1))
    .max(1000000000, validationMessages.maxCurrencyNumbers(1000000000)),
  expeditionDate: Yup.string()
    .matches(regex.date, validationMessages.date)
    .min(11, validationMessages.minCharacters(11))
    .max(11, validationMessages.maxCharacters(11)),

  country: Yup.string()
    .matches(regex.onlyLetters, validationMessages.country)
    .max(25, validationMessages.maxCharacters(25)),

  stateOrDepartment: Yup.string()
    .matches(regex.onlyLetters, validationMessages.stateOrDepartment)
    .max(25, validationMessages.maxCharacters(25)),

  city: Yup.string()
    .matches(regex.onlyLetters, validationMessages.city)
    .max(25, validationMessages.maxCharacters(25)),

  zipCode: Yup.string()
    .matches(regex.onlyNumbers, validationMessages.zipCode)
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
    .matches(regex.onlyNumbers, validationMessages.onlyNumbers)
    .min(11, validationMessages.minNumbers(11))
    .max(11, validationMessages.maxNumbers(11)),
};

export { validationRules };
