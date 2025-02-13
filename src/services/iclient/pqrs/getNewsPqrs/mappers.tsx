import { INew } from "@components/cards/RequestNews/types";
import { ITag } from "@inubekit/inubekit";
import { MdOutlinePerson, MdOutlineSupportAgent } from "react-icons/md";
import { pqrsStatusDM } from "src/model/domains/pqrs/pqrsStatusDM";

const pqrsStatusAppearance: Record<string, ITag["appearance"]> = {
  PendingClassification: "warning",
  Resolved: "success",
  Finished: "success",
  Received: "warning",
  InProcess: "warning",
  ReopenIncident: "warning",
};

const pqrsDescription: Record<string, string> = {
  create: "Se ha creado la PQRS",
  Status: "Se ha cambiado el estado de la PQRS a:",
};

const pqrsIcon: Record<string, React.JSX.Element> = {
  create: <MdOutlinePerson />,
  Status: <MdOutlineSupportAgent />,
};

const mapNewPqrsApiToEntity = (
  pqrs: Record<string, string | number | object>,
): INew => {
  const isChangeStatus = Object(pqrs.details).target === "Status";

  return {
    date: new Date(String(pqrs.creationDate)),
    description: pqrsDescription[String(Object(pqrs.details).target)],
    icon: pqrsIcon[String(Object(pqrs.details).target)],
    tag: isChangeStatus
      ? {
          appearance: pqrsStatusAppearance[String(Object(pqrs.details).value)],
          label:
            pqrsStatusDM.valueOf(String(Object(pqrs.details).value))?.value ||
            "",
        }
      : undefined,
  };
};

const mapNewsPqrsApiToEntities = (
  pqrsRequests: Record<string, string | number | object>[],
): INew[] => {
  return pqrsRequests.map((pqrs) => mapNewPqrsApiToEntity(pqrs));
};

export { mapNewPqrsApiToEntity, mapNewsPqrsApiToEntities };
