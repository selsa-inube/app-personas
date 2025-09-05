import * as Sentry from "@sentry/react";
import { RequestType } from "src/model/entity/request";

const captureNewError = (
  error: unknown,
  extras?: Record<string, unknown>,
  tags?: Record<string, unknown>,
) => {
  const primitiveTags: { [key: string]: string | number | boolean } = {};
  Object.entries(tags ?? {}).forEach(([key, value]) => {
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      primitiveTags[key] = value;
    } else if (value !== undefined && value !== null) {
      primitiveTags[key] = String(value);
    }
  });

  Sentry.captureException(error, {
    extra: extras,
    tags: primitiveTags,
  });
};

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

export { captureNewError, mapRequestErrorToTag };
