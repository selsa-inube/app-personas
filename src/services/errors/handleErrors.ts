import * as Sentry from "@sentry/react";

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

export { captureNewError };
