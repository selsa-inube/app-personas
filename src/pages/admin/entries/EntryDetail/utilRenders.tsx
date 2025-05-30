import { IServiceDomains } from "src/context/app/types";
import { IRequest } from "src/model/entity/request";
import { EntryDocument } from "./EntryDocument";

const getEntryDocument = (
  selectedEntry: IRequest,
  logoUrl: string,
  serviceDomains: IServiceDomains,
) => {
  return (
    <EntryDocument
      selectedEntry={selectedEntry}
      logoUrl={logoUrl}
      serviceDomains={serviceDomains}
    />
  );
};

export { getEntryDocument };
