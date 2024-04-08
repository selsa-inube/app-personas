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
              },
            ],
          },
        ],
      },
      {
        id: "handling_fee",
        label: "Cuota de manejo",
        value: [
          {
            id: "handling_fee_value",
            label: "Valor de la cuota",
            value: "7500",
          },
          {
            id: "reference",
            label: "Referencia",
            value: "Cuentas de ahorros - 013001157292",
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
    quotaDetails: ["590030780132"],
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
              },
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
              },
            ],
          },
        ],
      },
    ],
    quotaDetails: ["590030780133"],
  },
];

export { cardsMock };
