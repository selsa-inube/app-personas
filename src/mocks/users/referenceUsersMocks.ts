import { identificationTypeDM } from "src/model/domains/general/updateData/personalInformation/identificationTypeDM";
import { IReferenceThird } from "src/model/entity/user";

const referenceUsersMocks: IReferenceThird[] = [
  {
    identification: {
      firstName: "José",
      secondName: "Vicente",
      firstLastName: "Garzón",
      secondLastName: "Galeano",
      type: identificationTypeDM.CC,
      identificationNumber: 17128249,
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
      cellPhone: 3205510052,
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
      type: identificationTypeDM.CC,
      identificationNumber: 31253228,
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
      cellPhone: 3205510052,
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
      type: identificationTypeDM.CC,
      identificationNumber: 10134879,
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
      cellPhone: 3205510052,
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
