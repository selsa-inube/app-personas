import { convertDomainToList, convertDomainToOptions } from "../helper";

const positionData = {
  BACKEND_DEVELOPER: {
    id: "backendDeveloper",
    value: "Desarrollador back end",
  },
  FRONTEND_DEVELOPER: {
    id: "frontendDeveloper",
    value: "Desarrollador front end",
  },
  FULLSTACK_DEVELOPER: {
    id: "fullstackDeveloper",
    value: "Desarrollador full stack",
  },
};

const positionDMValueOf = (id: string) =>
  convertDomainToOptions(positionData).find((position) => position.id === id);

const positionDM = {
  ...positionData,
  list: convertDomainToList(positionData),
  options: convertDomainToOptions(positionData),
  valueOf: positionDMValueOf,
};

export { positionDM };
