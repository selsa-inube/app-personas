const savingsTableTitles = [
  {
    id: "reference",
    label: "Referencia",
    action: true,
    priority: 0,
  },
  {
    id: "concept",
    label: "Concepto",
    action: true,
    priority: 1,
  },
  {
    id: "totalBalance",
    label: "Saldo total",
    action: true,
    priority: 2,
  },
];

const commitmentsTableTitles = [
  {
    id: "concept",
    label: "Concepto",
    action: true,
    priority: 0,
  },
  {
    id: "commitmentValue",
    label: "Compromiso",
    action: true,
    priority: 1,
  },
  {
    id: "paymentDate",
    label: "Fecha de pago",
    action: true,
    priority: 2,
  },
  {
    id: "nextPayment",
    label: "Próximo pago",
    action: true,
    priority: 3,
  },
];

const paymentSummaryTitles = [
  {
    id: "concept",
    label: "Concepto",
    action: true,
    priority: 0,
  },
  {
    id: "nextDueDate",
    label: "Fecha próximo vencimiento",
    action: true,
    priority: 1,
  },
  {
    id: "nextDueValue",
    label: "Valor próximo vencimiento",
    action: true,
    priority: 2,
  },
];

const cardsTableTitles = [
  {
    id: "cardNumber",
    label: "Número de tarjeta",
    action: true,
    priority: 0,
  },
  {
    id: "productName",
    label: "Producto",
    action: true,
    priority: 1,
  },
  {
    id: "assignedQuota",
    label: "Cupo asignado",
    action: true,
    priority: 2,
  },
  {
    id: "availableQuota",
    label: "Cupo disponible",
    action: true,
    priority: 2,
  },
];

export {
  savingsTableTitles,
  commitmentsTableTitles,
  paymentSummaryTitles,
  cardsTableTitles,
};
