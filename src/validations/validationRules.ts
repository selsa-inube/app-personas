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

  birthDate: Yup.date().test(
    "valid-birth-date",
    validationMessages.validBirthDate,
    (value) => typeof value !== "undefined"
  ),

  expeditionDate: Yup.date().test(
    "valid-expedition-date",
    validationMessages.validExpeditionDate,
    (value) => typeof value !== "undefined"
  ),
};

export { validationRules };
