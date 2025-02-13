import { INew } from "@components/cards/RequestNews/types";
import { ITag } from "@inubekit/inubekit";
import { MdOutlineSupportAgent } from "react-icons/md";
import { requestStatusDM } from "src/model/domains/credits/requestStatusDM";

const requestNewStatusAppearance: Record<string, ITag["appearance"]> = {
  Received: "warning",
  Filed: "warning",
  InStudy: "warning",
  Approved: "success",
  Rejected: "danger",
  InDisbursement: "warning",
  Completed: "success",
  Cancelled: "danger",
  Finished: "success",
};

const requestNewDescription: Record<string, string> = {
  create: "Se ha creado la solicitud",
  Status: "Se ha cambiado el estado de la solicitud a:",
};

const mapNewApiToEntity = (
  requestNew: Record<string, string | number | object>,
): INew => {
  const isChangeStatus = Object(requestNew.details).target === "Status";
  return {
    date: new Date(String(requestNew.creationDate)),
    description:
      requestNewDescription[String(Object(requestNew.details).target)],
    icon: <MdOutlineSupportAgent />,
    tag: isChangeStatus
      ? {
          appearance:
            requestNewStatusAppearance[
              String(Object(requestNew.details).value)
            ],
          label:
            requestStatusDM.valueOf(String(Object(requestNew.details).value))
              ?.value || "",
        }
      : undefined,
  };
};

const mapNewsApiToEntities = (
  requestNews: Record<string, string | number | object>[],
): INew[] => {
  return requestNews.map((requestNew) => mapNewApiToEntity(requestNew));
};

export { mapNewApiToEntity, mapNewsApiToEntities };
