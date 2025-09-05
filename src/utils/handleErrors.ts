import { RequestType } from "src/model/entity/request";

const mapRequestErrorToTag = (context: RequestType) => {
  const featureTagMap: Record<RequestType, string> = {
    credit: "request-credit",
    aid: "request-aid",
    newprogrammedsaving: "request-programmed-saving",
    newcdat: "request-cdat",
    cancelprogrammedsaving: "request-cancel-programmed-saving",
    modifydeadlineactionprogrammedsaving:
      "request-modify-deadline-programmed-saving",
    cancelcdat: "request-cancel-cdat",
    modifyquotavalueprogrammedsaving:
      "request-modify-quota-value-programmed-saving",
    modifydeadlineactioncdat: "request-modify-deadline-cdat",
    updatedata: "request-update-data",
    registerinevent: "request-register-in-event",
  };

  return featureTagMap[context];
};

export { mapRequestErrorToTag };
