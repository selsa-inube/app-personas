const cityData = {
  BOGOTA: {
    id: "bogota",
    value: "Bogota",
    description: "Bogotá - Distrito Capital",
  },
  MEDELLIN: {
    id: "medellin",
    value: "Medellin",
    description: "Medellín - Antioquia",
  },
  CALI: {
    id: "cali",
    value: "Cali",
    description: "Cali - Valle del Cauca",
  },
};

const cityDM: typeof cityData & { list: string[] } = {
  ...cityData,
  list: Object.values(cityData).map((city) => city.value),
};

export { cityDM };
