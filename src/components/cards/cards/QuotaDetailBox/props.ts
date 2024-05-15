const props = {
  title: {
    description: "Pago mínimo",
  },
  paymentItems: {
    description: "Array of payment items",
    table: {
      type: {
        summary: "Array",
      },
      defaultValue: {
        summary: "[]",
      },
    },
    control: {
      type: null,
    },
  },
};

export { props };
