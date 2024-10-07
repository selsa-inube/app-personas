import { INew } from "@components/cards/RequestNews/types";
import { ITag } from "@inubekit/tag";
import { MdOutlineSupportAgent } from "react-icons/md";
import { requestStatusDM } from "src/model/domains/credits/requestStatusDM";

const requestStatusAppearance: Record<string, ITag["appearance"]> = {
  Received: "warning",
  Filed: "warning",
  InStudy: "warning",
  Approved: "success",
  Rejected: "danger",
  InDisbursement: "warning",
  Completed: "success",
  Cancelled: "danger",
};

const mapNewApiToEntity = (
  request: Record<string, string | number | object>,
): INew => {
  const isChangeStatus = Object(request.details).target === "status";
  return {
    date: new Date(String(request.creationDate)),
    description: isChangeStatus
      ? "Se ha cambiado el estado de la solicitud a:"
      : "",
    icon: <MdOutlineSupportAgent />,
    tag: isChangeStatus
      ? {
          appearance:
            requestStatusAppearance[String(Object(request.details).value)],
          label:
            requestStatusDM.valueOf(String(Object(request.details).value))
              ?.value || "",
        }
      : undefined,
  };
};

const mapNewsApiToEntities = (
  requests: Record<string, string | number | object>[],
): INew[] => {
  return requests.map((request) => mapNewApiToEntity(request));
};

export { mapNewApiToEntity, mapNewsApiToEntities };
