import { IThird } from "src/model/entity/user";
import { capitalizeText } from "src/utils/texts";

const mapCustomerApiToEntity = (
  customer: Record<string, string | number | object>,
): IThird => {
  const naturalAttrs =
    Array.isArray(customer.generalAttributeClientNaturalPersons) &&
    customer.generalAttributeClientNaturalPersons.length > 0 &&
    customer.generalAttributeClientNaturalPersons[0];

  const paymentMethod =
    naturalAttrs.paymentMethod && naturalAttrs.paymentMethod.split("-")[0];
  const paymentMethodName =
    naturalAttrs.paymentMethod &&
    capitalizeText(naturalAttrs.paymentMethod.split("-")[1]);

  return {
    personalData: {
      identification: {
        identificationNumber: Number(customer.publicCode),
        city: naturalAttrs.birthCity,
        country: naturalAttrs.placeExpeditionIdentification,
        departament: naturalAttrs.jobCity,
        firstLastName: naturalAttrs.lastNames,
        secondLastName: naturalAttrs.firstNames,
        firstName: naturalAttrs.firstNames,
        secondName: naturalAttrs.firstNames,
        type: {
          id: naturalAttrs.typeIdentification,
          value: naturalAttrs.typeIdentification,
        },
      },
      birthCity: naturalAttrs.birthCity,
      birthCountry: naturalAttrs.placeExpeditionIdentification,
      birthDate: naturalAttrs.dateBirth,
      bloodType: naturalAttrs.rhFactor,
      maritalStatus: naturalAttrs.civilStatus,
      gender: naturalAttrs.gender,
    },
    contact: [],
    bankTransfersAccount: {
      accountNumber: naturalAttrs.transferAccountNumber,
      accountType: naturalAttrs.transferAccountType,
      bankEntity: naturalAttrs.transferAccountBank,
      description: naturalAttrs.transferAccountType,
    },
    financialOperations: {
      accountNumber: naturalAttrs.transferAccountNumber,
      bankEntity: naturalAttrs.transferAccountBank,
      country: naturalAttrs.placeExpeditionIdentification,
      currency: "COP",
      descriptionOperations: naturalAttrs.transferAccountType,
      hasForeignCurrencyAccounts: "N",
      hasForeignCurrencyTransactions: "N",
      paymentMethod: paymentMethod &&
        paymentMethodName && {
          id: paymentMethod,
          value: paymentMethodName,
        },
    },
  };
};

export { mapCustomerApiToEntity };
