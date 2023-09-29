import * as Yup from "yup";
import { regex } from "./regularExpressions";
import { validationMessages } from "./validationMessages";

const validationRules = {
  name: Yup.string()
    .matches(regex.onlyLetters, validationMessages.onlyLetters)
    .min(8, validationMessages.minCharacters(8))
    .max(30, validationMessages.maxCharacters(30)),
  lastName: Yup.string()
    .matches(regex.onlyLetters, validationMessages.onlyLetters)
    .min(8, validationMessages.minCharacters(8))
    .max(30, validationMessages.maxCharacters(30)),

  identification: Yup.string()
    .test(
      "valid-identification",
      validationMessages.validIdentification,
      (value) => typeof value !== "undefined"
    )
    .min(5, validationMessages.minNumbers(5))
    .max(15, validationMessages.maxNumbers(15)),

  phone: Yup.string()
    .matches(regex.onlyNumbers, validationMessages.validPhone)
    .min(10, validationMessages.minNumbers(10))
    .max(10, validationMessages.maxNumbers(10)),

  email: Yup.string()
    .matches(regex.emailFormat, validationMessages.validEmail)
    .min(8, validationMessages.minCharacters(8))
    .max(80, validationMessages.maxCharacters(80)),

  password: Yup.string()
    .matches(regex.passwordFormat, validationMessages.validPassword)
    .min(8, validationMessages.minCharacters(8))
    .max(30, validationMessages.maxCharacters(30)),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], validationMessages.passwordMatch)
    .min(8, validationMessages.minCharacters(8))
    .max(30, validationMessages.maxCharacters(30)),

  birthDate: Yup.string()
    .matches(regex.date, validationMessages.validBirthDate)
    .min(11, validationMessages.minCharacters(11))
    .max(11, validationMessages.maxCharacters(11)),

  expeditionDate: Yup.string()
    .matches(regex.date, validationMessages.validExpeditionDate)
    .min(11, validationMessages.minCharacters(11))
    .max(11, validationMessages.maxCharacters(11)),

  country: Yup.string()
    .matches(regex.onlyLetters, validationMessages.validCountry)
    .min(3, validationMessages.minCharacters(3))
    .max(25, validationMessages.maxCharacters(25)),

  address: Yup.string()
    .min(10, validationMessages.minCharacters(10))
    .max(40, validationMessages.maxCharacters(40)),

  stateOrDepartment: Yup.string()
    .matches(regex.onlyLetters, validationMessages.validStateOrDepartment)
    .max(25, validationMessages.maxCharacters(25)),

  city: Yup.string()
    .matches(regex.onlyLetters, validationMessages.validCity)
    .max(25, validationMessages.maxCharacters(25)),

  postalCode: Yup.string()
    .matches(regex.onlyNumbers, validationMessages.validPostalCode)
    .min(5, validationMessages.minNumbers(5))
    .max(10, validationMessages.maxNumbers(10)),

  landlinePhone: Yup.string()
    .matches(regex.onlyNumbers, validationMessages.validLandlinePhone)
    .min(8, validationMessages.minNumbers(8))
    .max(10, validationMessages.maxNumbers(10)),
};

export { validationRules };
