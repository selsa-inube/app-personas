import {
  MdOutlineAccountBalance,
  MdOutlineAttachMoney,
  MdOutlineCreditCard,
  MdOutlineSavings,
} from "react-icons/md";

const quickLinks = (
  checkSavingsFlag: boolean,
  checkCreditsFlag: boolean,
  checkCardsFlag: boolean,
  makePayments: boolean,
) => [
  ...(checkSavingsFlag
    ? [
        {
          icon: <MdOutlineSavings />,
          label: "Consultar ahorros",
          path: "/my-savings",
        },
      ]
    : []),
  ...(checkCreditsFlag
    ? [
        {
          icon: <MdOutlineAccountBalance />,
          label: "Consultar créditos",
          path: "/my-credits",
        },
      ]
    : []),
  ...(checkCardsFlag
    ? [
        {
          icon: <MdOutlineCreditCard />,
          label: "Consultar tarjetas",
          path: "/my-cards",
        },
      ]
    : []),
  ...(makePayments
    ? [
        {
          icon: <MdOutlineAttachMoney />,
          label: "Realizar pagos",
          path: "/payments",
        },
      ]
    : []),
];

export { quickLinks };
