import { IReferenceThird } from "src/model/entity/user";

const referenceUsersMocks: IReferenceThird[] = [
  {
    identification: {
      firstName: "José",
      secondName: "Vicente",
      firstLastName: "Garzón",
      secondLastName: "Galeano",
      type: "cc",
      identificationNumber: 17128249,
      city: "bogota",
    },
    contact: {
      id: "01",
      country: "Colombia",
      address: "CR 1 No 66 42 AP 202 BL 7",
      department: "Cundinamarca",
      city: "bogota",
      landlinePhone: "37670777",
      cellPhone: "3205510052",
      email: "jose.garzon@gmail.com",
    },
    information: {
      birthDate: "24/Oct/1989",
      gender: "masculino",
      educationLevel: "university",
      businessActivity: "services",
      profession: "lawyer",
    },
  },
  {
    identification: {
      firstName: "John",
      secondName: "Alexander",
      firstLastName: "Mozo",
      secondLastName: "Páramo",
      type: "cc",
      identificationNumber: 31253228,
      city: "bogota",
    },
    contact: {
      id: "01",
      country: "Colombia",
      address: "CR 1 No 66 42 AP 202 BL 7",
      department: "Cundinamarca",
      city: "bogota",
      landlinePhone: "37670777",
      cellPhone: "3205510052",
      email: "john.mozo@yahooo.com.mx",
    },
    information: {
      birthDate: "24/Oct/1989",
      gender: "masculino",
      educationLevel: "university",
      businessActivity: "services",
      profession: "lawyer",
    },
  },
  {
    identification: {
      firstName: "Jeniffer",
      secondName: "Alejandra",
      firstLastName: "Garzón",
      secondLastName: "Páramo",
      type: "cc",
      identificationNumber: 10134879,
      city: "bogota",
    },
    contact: {
      id: "01",
      country: "Colombia",
      address: "CR 1 No 66 42 AP 202 BL 7",
      department: "Cundinamarca",
      city: "bogota",
      landlinePhone: "37670777",
      cellPhone: "3205510052",
      email: "john.mozo@yahooo.com.mx",
    },
    information: {
      birthDate: "24/Oct/1989",
      gender: "female",
      educationLevel: "university",
      businessActivity: "services",
      profession: "lawyer",
    },
  },
];

export { referenceUsersMocks };