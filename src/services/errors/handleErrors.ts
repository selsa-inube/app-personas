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
  const updatedError = error;

  if (
    updatedError &&
    typeof updatedError === "object" &&
    "name" in updatedError &&
    typeof updatedError.name === "string"
  ) {
    (updatedError as Error).name =
      `${extras?.action}-${extras?.screen} (${(updatedError as Error).name})`;
  }

  Sentry.captureException(updatedError, {
    extra: { extras, error },
    tags: primitiveTags,
  });
};

export { captureNewError };
