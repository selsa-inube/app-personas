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
      (value) => typeof value !== "undefined",
    )
    .min(5, validationMessages.minNumbers(5))
    .max(15, validationMessages.maxNumbers(15)),

  phone: Yup.number()
    .positive(validationMessages.phone)
    .test(
      "valid-phone",
      `${validationMessages.numbers(10)}`,
      (value) => String(value).length === 10,
    ),

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
    .min(10, validationMessages.minCharacters(10))
    .max(10, validationMessages.maxCharacters(10)),

  notPastDate: Yup.string().test(
    "is-not-past-date",
    validationMessages.notPastDate,
    (value) => {
      if (!value) return true;

      const dateDivider = value.split("-");
      const year = parseInt(dateDivider[0]);
      const monthNumber = parseInt(dateDivider[1]) - 1;
      const day = parseInt(dateDivider[2]);

      const date = new Date(year, monthNumber, day);
      const today = new Date();

      today.setHours(0, 0, 0, 0);

      return date >= today;
    },
  ),

  money: Yup.number()
    .min(1, validationMessages.minCurrencyNumbers(1))
    .max(1000000000, validationMessages.maxCurrencyNumbers(1000000000)),

  currency: Yup.string()
    .min(3, validationMessages.minCharacters(3))
    .max(10, validationMessages.maxCharacters(3)),

  expeditionDate: Yup.string()
    .matches(regex.date, validationMessages.date)
    .min(11, validationMessages.minCharacters(11))
    .max(11, validationMessages.maxCharacters(11)),

  zipCode: Yup.string()
    .matches(regex.onlyNumbers, validationMessages.zipCode)
    .min(5, validationMessages.minNumbers(5))
    .max(10, validationMessages.maxNumbers(10)),

  landlinePhone: Yup.string()
    .matches(regex.onlyNumbers, validationMessages.landlinePhone)
    .min(7, validationMessages.minNumbers(7))
    .max(10, validationMessages.maxNumbers(10)),

  address: Yup.string()
    .min(5, validationMessages.minCharacters(5))
    .max(100, validationMessages.maxCharacters(100)),

  accountNumber: Yup.string()
    .matches(regex.onlyNumbers, validationMessages.onlyNumbers)
    .min(8, validationMessages.minNumbers(11))
    .max(12, validationMessages.maxNumbers(11)),

  birthDate: Yup.string()
    .test("valid-birthdate", "La fecha de nacimiento no es válida", (value) => {
      if (!value) return true;
      const dateDivider = value.split("-");
      const year = parseInt(dateDivider[0]);
      const monthNumber = parseInt(dateDivider[1]) - 1;
      const day = parseInt(dateDivider[2]);
      const birthDate = new Date(year, monthNumber, day);
      const today = new Date();
      const minBirthDate = new Date(
        today.getFullYear() - 111,
        today.getMonth(),
        today.getDate(),
      );

      return birthDate >= minBirthDate;
    })

    .test(
      "not-future-birthdate",
      "La fecha de nacimiento no puede ser una fecha futura",
      (value) => {
        if (!value) return true;
        const dateDivider = value.split("-");
        const year = parseInt(dateDivider[0]);
        const monthNumber = parseInt(dateDivider[1]) - 1;
        const day = parseInt(dateDivider[2]);
        const birthDate = new Date(year, monthNumber, day);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return birthDate <= today;
      },
    ),
};

export { validationRules };
