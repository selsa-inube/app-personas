import { IThird } from "src/model/entity/user";

const usersMock: IThird[] = [
  {
    personalData: [
      {
        identification: [
          {
            firstName: "David",
            secondName: "Leonardo",
            firstLastName: "Garzón",
            secondLastName: "Páramo",
            type: "Cédula de ciudadanía",
            number: "1013614213",
            place: "Bogotá - Distrito capital",
            date: "05/Ago/2008",
          },
        ],
        birthDate: "02/Ago/1990",
        birthCity: "Bogotá - Distrito capital",
        gender: "Masculino",
        maritalStatus: "Soltero",
        bloodType: "O +",
      },
    ],
    contact: [
      {
        address: "CR 1 No 66 42 AP 202 BL 7",
        department: "Cundinamarca",
        city: "Bogotá D.C",
        zipCode: "111511",
        landlinePhone: "37670777",
        cellPhone: "320 5510052",
        email: "dgarzon@sistemasenlinea.com.co",
      },
    ],
    familyGroup: [
        {
          identification: [
              {
                firstName: "Leidy",
                secondName: "Paola",
                firstLastName: "Ángel",
                secondLastName: "Marín",
                type: "Cédula de ciudadanía",
                number: "13156778",
              },
            ],
            contact: [
              {
                address: "CR 1 No 66 42 AP 202 BL 7",
                department: "Cundinamarca",
                city: "Bogotá D.C",
                landlinePhone: "37670777",
                cellPhone: "314 2881128",
                email: "leidy.angel@litigando.com.co",
              },
            ],
            information: {
              birthDate: "24/Oct/1989",
              gender: "Femenino",
              relationship: "Esposa",
              isDependent: false,
              educationLevel: "Profesional",
              businessActivity: "Servicios",
              profession: "Abogada"
            },
        },
      {
        identification: [
          {
            firstName: "Eunice",
            firstLastName: "Páramo",
            type: "Cédula de ciudadanía",
            number: "41739900",
          },
        ],
        contact: [
          {
            address: "CR 1 No 66 42 AP 501 BL 4",
            department: "Cundinamarca",
            city: "Bogotá D.C",
            cellPhone: "320 5510052",
            email: "eunice.paramo@outlook.com",
          },
        ],
        information: {
          birthDate: "10/10/1966",
          gender: "Femenino",
          relationship: "Madre",
        },
      },
    ],
  },
];

export { usersMock };