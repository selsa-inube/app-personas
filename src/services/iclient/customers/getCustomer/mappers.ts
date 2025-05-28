import { IBeneficiary, IThird } from "src/model/entity/user";
import { capitalizeText } from "src/utils/texts";

const mapBeneficiaryApiToEntity = (
  beneficiary: Record<string, string | number | object>,
): IBeneficiary => {
  return {
    identificationNumber: String(beneficiary.identificationNumber || ""),
    identificationType: String(beneficiary.identificationType || ""),
    name: String(beneficiary.name || ""),
    relationship: beneficiary.relationship
      ? {
          id: String(Object(beneficiary.relationship)?.code || ""),
          value: String(Object(beneficiary.relationship)?.code || ""),
          label: String(Object(beneficiary.relationship)?.label || ""),
        }
      : undefined,
    birthDate: String(beneficiary.birthDate || ""),
  };
};

const mapBeneficiariesToEntity = (
  beneficiaries: Record<string, string | number | object>[],
): IBeneficiary[] => {
  return beneficiaries.map(mapBeneficiaryApiToEntity);
};

const getRHFactor = (text: string) => {
  const match = text.match(/([A-Z]+\W)/);
  return match ? match[1] : null;
};

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
  const bankEntityCode = naturalAttrs.transferAccountBank
    ? naturalAttrs.transferAccountBank.split("-")[0]
    : "";
  const bankEntityName = naturalAttrs.transferAccountBank
    ? capitalizeText(naturalAttrs.transferAccountBank.split("-")[1])
    : "";

  return {
    personalData: {
      identification: {
        identificationNumber: Number(customer.publicCode),
        city: naturalAttrs.cityExpeditionIdentification || "",
        country: naturalAttrs.countryExpeditionIdentification || "",
        departament: naturalAttrs.departmentExpeditionIdentification || "",
        firstLastName: naturalAttrs.lastNames,
        secondLastName: naturalAttrs.firstNames,
        firstName: naturalAttrs.firstNames,
        secondName: naturalAttrs.firstNames,
        type: {
          id: naturalAttrs.typeIdentification.split("-")[0],
          value: naturalAttrs.typeIdentification.split("-")[1],
        },
        date: naturalAttrs.dateExpeditionIdentification,
      },
      birthCity: naturalAttrs.birthCity || "",
      birthCountry: naturalAttrs.birthCountry || "",
      birthDepartment: naturalAttrs.birthDepartment || "",
      birthDate: naturalAttrs.dateBirth,
      rhFactor: getRHFactor(naturalAttrs.rhFactor || "") || "",
      civilStatus: naturalAttrs.civilStatus.split("-")[0],
      gender: naturalAttrs.gender.split("-")[0],
    },
    contact: [
      {
        id: "1",
        country: naturalAttrs.residentialLocationCountry || "",
        department: naturalAttrs.residentialLocationDepartment || "",
        city: naturalAttrs.residentialLocationCity || "",
        address: naturalAttrs.residentialAddress || "",
        landlinePhone: naturalAttrs.residentialPhone,
        cellPhone: naturalAttrs.cellPhoneContact,
        email: naturalAttrs.emailContact,
        zipCode: naturalAttrs.residentialPostalCode,
      },
    ],
    bankTransfersAccount: {
      accountNumber: naturalAttrs.transferAccountNumber,
      accountType: naturalAttrs.transferAccountType,
      bankEntityCode,
      bankEntityName,
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
          value: paymentMethod,
          label: paymentMethodName,
        },
    },
    beneficiaries: Array.isArray(customer.clientFamilyGroups)
      ? mapBeneficiariesToEntity(Object(customer).clientFamilyGroups || [])
      : [],
  };
};

export { mapCustomerApiToEntity };
