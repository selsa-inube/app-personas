import { IRequest } from "src/model/entity/request";

const generateAttributes = (request: IRequest) => {
  return [
    {
      id: "requestedEntries",
      label: "Entradas solicitadas",
      value: Number(
        request["entriesCategories"]?.reduce(
          (acc: number, entry: { count?: number }) => acc + (entry.count || 0),
          0,
        ) || 0,
      ),
    },
    {
      id: "customerCode",
      label: "Número de identificación",
      value: request["customerCode"] as string | number | Date,
    },
    {
      id: "trackingCode",
      label: "Código de seguimiento",
      value: request["trackingCode"] as string | number | Date,
    },
    {
      id: "requestDate",
      label: "Fecha de solicitud",
      value: request["requestDate"] as string | number | Date,
    },
  ];
};

export { generateAttributes };
