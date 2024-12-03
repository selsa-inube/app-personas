import { IPQRS } from "src/model/entity/pqrs";

const pqrsHistoryMock: IPQRS[] = [
  {
    id: "PQ20105004",
    title: "PQRS",
    motive: "Aportes y ahorros",
    code: "PQ20105004",
    type: "Petición",
    attentionPlace: "Regional Cali",
    date: new Date("2024-09-18T13:31:00.000Z"),
    description:
      "Petición 41-241000098 Emp: FONDO DE EMPLEADOS DE LA CAJA DE COMPENSACION FAMILIAR DEL VALLE DEL CAUCA",
    details:
      "Me gustaría recibir un estado de cuenta actual, ya que el área de cartera me informa que tengo un crédito pendiente, el cual ya había cancelado a principios de año.",
    tag: {
      label: "En revisión",
      appearance: "warning",
    },
    file: {
      id: "001-1",
      name: "Estado de cuenta.pdf",
      size: 2045,
    },
  },
  {
    id: "PQ20105003",
    title: "PQRS",
    motive: "Cartera",
    code: "PQ20105003",
    type: "Queja",
    attentionPlace: "Regional Palmira",
    date: new Date("2024-06-20T18:33:00.000Z"),
    description:
      "Queja 74-123456101 Emp: FONDO DE EMPLEADOS DE LA CAJA DE COMPENSACION FAMILIAR DEL VALLE DEL CAUCA",
    details:
      "Me gustaría recibir un estado de cuenta actual, ya que el área de cartera me informa que tengo un crédito pendiente, el cual ya había cancelado a principios de año.",
    tag: {
      label: "En revisión",
      appearance: "warning",
    },
    file: {
      id: "001-2",
      name: "Estado de cuenta.pdf",
      size: 1470,
    },
  },
  {
    id: "PQ20105002",
    title: "PQRS",
    motive: "Certificados",
    code: "PQ20105002",
    type: "Reclamo",
    attentionPlace: "Regional Buga",
    date: new Date("2024-06-12T13:17:00.000Z"),
    description:
      "Reclamo 21-123456102 Emp: FONDO DE EMPLEADOS DE LA CAJA DE COMPENSACION FAMILIAR DEL VALLE DEL CAUCA",
    details:
      "Me gustaría recibir un estado de cuenta actual, ya que el área de cartera me informa que tengo un crédito pendiente, el cual ya había cancelado a principios de año.",
    tag: {
      label: "Completado",
      appearance: "success",
    },
    file: {
      id: "001-3",
      name: "Estado de cuenta.pdf",
      size: 1210,
    },
  },
  {
    id: "PQ20105001",
    title: "PQRS",
    motive: "Oficina virtual y pagina web",
    code: "PQ20105001",
    type: "Sugerencia",
    attentionPlace: "Regional Cartago",
    date: new Date("2024-06-03T19:05:00.000Z"),
    description:
      "Sugerencia 41-123456110 Emp: FONDO DE EMPLEADOS DE LA CAJA DE COMPENSACION FAMILIAR DEL VALLE DEL CAUCA",
    details:
      "Me gustaría recibir un estado de cuenta actual, ya que el área de cartera me informa que tengo un crédito pendiente, el cual ya había cancelado a principios de año.",
    tag: {
      label: "Cancelado",
      appearance: "danger",
    },
    file: {
      id: "001-3",
      name: "Estado de cuenta.pdf",
      size: 1147,
    },
  },
];

export { pqrsHistoryMock };
