import { convertDomainToList, convertDomainToOptions } from "src/utils/domains";

const departmentData = {
  GUAINIA: { id: "94", value: "Guainia" },
  GUAVIARE: { id: "95", value: "Guaviare" },
  HUILA: { id: "41", value: "Huila" },
  "LA GUAJIRA": { id: "44", value: "La Guajira" },
  MAGDALENA: { id: "47", value: "Magdalena" },
  META: { id: "50", value: "Meta" },
  NARINO: { id: "52", value: "Narino" },
  "NORTE DE SANTANDER": { id: "54", value: "Norte De Santander" },
  PUTUMAYO: { id: "86", value: "Putumayo" },
  QUINDIO: { id: "63", value: "Quindio" },
  RISARALDA: { id: "66", value: "Risaralda" },
  "SAN ANDRES Y PROV": { id: "88", value: "San Andres Y Prov" },
  SANTANDER: { id: "68", value: "Santander" },
  SUCRE: { id: "70", value: "Sucre" },
  TOLIMA: { id: "73", value: "Tolima" },
  "VALLE DEL CAUCA": { id: "76", value: "Valle Del Cauca" },
  VAUPES: { id: "97", value: "Vaupes" },
  VICHADA: { id: "99", value: "Vichada" },
  "DISTRITO CAPITAL": { id: "11", value: "Distrito Capital" },
  AMAZONAS: { id: "91", value: "Amazonas" },
  ANTIOQUIA: { id: "05", value: "Antioquia" },
  ARAUCA: { id: "81", value: "Arauca" },
  ATLANTICO: { id: "08", value: "Atlantico" },
  BOLIVAR: { id: "13", value: "Bolivar" },
  BOYACA: { id: "15", value: "Boyaca" },
  CALDAS: { id: "17", value: "Caldas" },
  CAQUETA: { id: "18", value: "Caqueta" },
  CASANARE: { id: "85", value: "Casanare" },
  CAUCA: { id: "19", value: "Cauca" },
  CESAR: { id: "20", value: "Cesar" },
  CHOCO: { id: "27", value: "Choco" },
  CORDOBA: { id: "23", value: "Cordoba" },
  CUNDINAMARCA: { id: "25", value: "Cundinamarca" },
  APURE: { id: "854", value: "Apure" },
  ARAGUA: { id: "21", value: "Aragua" },
  "FRANCISCO MORAZAN": { id: "081", value: "Francisco Morazan" },
  LARA: { id: "30", value: "Lara" },
  CARABOBO: { id: "31", value: "Carabobo" },
  ZULIA: { id: "40", value: "Zulia" },
  ANZOTEGUI: { id: "281", value: "Anzotegui" },
  BARINAS: { id: "125", value: "Barinas" },
  MERIDA: { id: "51", value: "Merida" },
  ANZOATEGUI: { id: "128", value: "Anzoategui" },
};

const departmentDMValueOf = (id: string) =>
  Object.values(departmentData).find((item) => item.id === id);

const departmentDM = {
  ...departmentData,
  list: convertDomainToList(departmentData),
  options: convertDomainToOptions(departmentData),
  valueOf: departmentDMValueOf,
};

export { departmentDM };
