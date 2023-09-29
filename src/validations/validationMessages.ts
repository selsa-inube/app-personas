const validationMessages = {
  maxCharacters: (count: number) => `Debe tener máximo ${count} caracteres`,
  minCharacters: (count: number) => `Debe tener al menos ${count} caracteres`,
  maxNumbers: (count: number) => `Debe tener máximo ${count} números`,
  minNumbers: (count: number) => `Debe tener al menos ${count} números`,
  required: "Este campo no puede estar vacío",
  onlyLetters: "Este campo debe contener solo letras",
  validIdentification:
    "Este campo debe contener un número de identificación válido",
  validEmail:
    "Este campo debe tener una dirección de correo electrónico válida",
  validPhone: "Este campo debe tener un número de teléfono válido",
  validPassword: `Este campo debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número`,
  passwordMatch: "Las contraseñas no coinciden",
  validBirthDate: "La fecha de nacimiento no es válida",
  validExpeditionDate: "La fecha de expedición no es válida",
  validPostalCode: "Este campo debe contener un código postal válido",
  validLandlinePhone: "Este campo debe tener un número de teléfono fijo válido",
  validCountry: "Este campo debe contener un país válido",
  validStateOrDepartment:
    "Este campo debe contener un estado o departamento válido",
  validCity: "Este campo debe contener una ciudad válida",
};

export { validationMessages };
