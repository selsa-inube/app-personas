import { EProductType, IProduct } from "src/model/entity/product";

const cardsMock: IProduct[] = [
  {
    id: "5240 5217 8304 1087",
    title: "Tarjeta - Banco Coopcentral",
    description: "Tarjeta - Banco Coopcentral 5240 5217 8304 1087",
    type: EProductType.CREDITCARD,
    attributes: [
      {
        id: "card_number",
        label: "Numero de tarjeta",
        value: "5240 5217 8304 1087",
      },
      {
        id: "cardholder",
        label: "Titular",
        value: "David Leonardo Garzón Páramo",
      },
      {
        id: "payment_method",
        label: "Medio de pago",
        value: "Fondecom mensual",
      },
      {
        id: "status",
        label: "Estado",
        value: "Activa",
      },
      {
        id: "savings_accounts",
        label: "Cuentas de ahorro",
        value: [
          {
            id: "product-1",
            label: "Ahorro a la vista",
            value: [
              {
                id: "account_number",
                label: "Número de cuenta",
                value: "013001157292",
              },
              {
                id: "net_value",
                label: "Saldo total",
                value: "366976",
              }
            ],
          },
        ],
      },
    ],
    tags: [
      {
        label: "Cupo en mora",
        appearance: "error",
        textAppearance: "error",
        modifier: "clear",
      },
    ],
  },
  {
    id: "2252 0231 6598 2291",
    title: "Tarjeta - Banco Coopcentral",
    description: "Tarjeta - Banco Coopcentral 2252 0231 6598 2291",
    type: EProductType.CREDITCARD,
    attributes: [
      {
        id: "card_number",
        label: "Numero de tarjeta",
        value: "2252 0231 6598 2291",
      },
      {
        id: "cardholder",
        label: "Titular",
        value: "Bairon Esneider Perez Gonzalez",
      },
      {
        id: "payment_method",
        label: "Medio de pago",
        value: "Fondecom mensual",
      },
      {
        id: "status",
        label: "Estado",
        value: "Activa",
      },
      {
        id: "savings_accounts",
        label: "Cuentas de ahorro",
        value: [
          {
            id: "product-1",
            label: "Ahorro construccion",
            value: [
              {
                id: "account_number",
                label: "Número de cuenta",
                value: "013001162880",
              },
              {
                id: "net_value",
                label: "Saldo total",
                value: "0",
              }
            ],
          },
          {
            id: "product-2",
            label: "Ahorro a la vista",
            value: [
              {
                id: "account_number",
                label: "Número de cuenta",
                value: "013010042193",
              },
              {
                id: "net_value",
                label: "Saldo total",
                value: "819153",
              }
            ],
          },
        ],
      },
    ],
  },
];

export { cardsMock };
