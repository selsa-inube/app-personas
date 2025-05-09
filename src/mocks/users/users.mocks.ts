import { identificationTypeDM } from "src/model/domains/general/updateData/personalInformation/identificationTypeDM";
import { relationshipDM } from "src/model/domains/general/updateData/personalResidence/relationshipDM";
import { IBeneficiary, IThird } from "src/model/entity/user";
import { convertDomainToOption } from "src/utils/domains";

const usersMock: IThird[] = [
  {
    personalData: {
      identification: {
        firstName: "David",
        secondName: "Leonardo",
        firstLastName: "Garzón",
        secondLastName: "Páramo",
        type: identificationTypeDM.CC,
        identificationNumber: 1013614213,
        country: "COL",
        departament: "cundinamarca",
        city: "bogota",
        date: "2008-08-05T05:00:00.000Z",
      },
      birthDate: "1990-08-02T05:00:00.000Z",
      birthCity: "bogota",
      birthDepartment: "cundinamarca",
      birthCountry: "COL",
      gender: "masculino",
      civilStatus: "single",
      rhFactor: "o_positive",
    },
    contact: [
      {
        id: "01",
        country: "Colombia",
        address: "CR 1 No 66 42 AP 202 BL  7",
        department: "Cundinamarca",
        city: "bogota",
        zipCode: "111511",
        landlinePhone: 37670777,
        cellPhone: 3205510052,
        email: "dgarzon@sistemasenlinea.com.co",
      },
      {
        id: "02",
        country: "Colombia",
        address: "CR 2 No 88 23 AP 009 BL 5",
        department: "Antioquia",
        city: "medellin",
        zipCode: "112375",
        landlinePhone: 35689034,
        cellPhone: 3124573839,
        email: "jgarcia@sistemasenlinea.com.co",
      },
    ],
    familyGroup: [
      {
        identification: {
          firstName: "Leidy",
          secondName: "Paola",
          firstLastName: "Ángel",
          secondLastName: "Marín",
          type: identificationTypeDM.CC,
          identificationNumber: 13156778,
          country: "COL",
          departament: "cundinamarca",
          city: "bogota",
        },
        contact: {
          id: "01",
          country: "Colombia",
          address: "CR 1 No 66 42 AP 202 BL 7",
          department: "Cundinamarca",
          city: "bogota",
          landlinePhone: 37670777,
          cellPhone: 3142881128,
          email: "leidy.angel@litigando.com.co",
        },
        information: {
          birthDate: "1989-10-24",
          gender: "female",
          relationship: "wife",
          isDependent: "N",
          educationLevel: "university",
          businessActivity: "services",
          profession: "lawyer",
        },
      },
      {
        identification: {
          firstName: "Eunice",
          secondName: "",
          firstLastName: "Páramo",
          secondLastName: "de Garzón",
          type: identificationTypeDM.CC,
          identificationNumber: 41739900,
          country: "COL",
          departament: "cundinamarca",
          city: "bogota",
        },
        contact: {
          id: "01",
          country: "Colombia",
          address: "CR 1 No 66 42 AP 501 BL 4",
          department: "Cundinamarca",
          city: "bogota",
          landlinePhone: 37670777,
          cellPhone: 3205510052,
          email: "eunice.paramo@outlook.com",
        },
        information: {
          birthDate: "1966-10-10",
          gender: "female",
          relationship: "mother",
          isDependent: "N",
          educationLevel: "",
          businessActivity: "",
          profession: "",
        },
      },
    ],
    bankTransfersAccount: {
      bankEntityCode: "07",
      bankEntityName: "bancolombia",
      accountType: "savingsAccount",
      accountNumber: "76454473406",
      description: "Bancolombia - Ahorros - **3406",
    },
    financialOperations: {
      hasForeignCurrencyAccounts: "Y",
      hasForeignCurrencyTransactions: "N",
      descriptionOperations:
        "Importación de materia prima, importación auto partes, importación de repuestos, importación de equipos celulares, importación de equipos médicos, importación de piezas electrónicas.",
      country: "USA",
      bankEntity: "Banco de Bogotá",
      currency: "USD",
      accountNumber: 76454473409,
    },
  },
];

const beneficiariesMock: IBeneficiary[] = [
  {
    name: "Castillo Rodriguez Victor Ovidio",
    identificationType: "C.C",
    identificationNumber: "113697385",
    relationship: convertDomainToOption(relationshipDM.PARTNER),
  },
  {
    name: "Jose Antonio Castillo Mayang",
    identificationType: "C.C",
    identificationNumber: "2605498",
    relationship: convertDomainToOption(relationshipDM.FATHER),
  },
  {
    name: "Gloria Nancy Rodriguez Cuadros",
    identificationType: "C.C",
    identificationNumber: "26785452",
    relationship: convertDomainToOption(relationshipDM.MOTHER),
  },
];

const developmentUsersMock: Record<string, string> = {
  "12340001": "66861642",
  "12340002": "1113697385",
  "12340003": "31577163",
};

export { beneficiariesMock, developmentUsersMock, usersMock };
