import * as Sentry from "@sentry/react";

const inititializeErrorHandling = () => {
  Sentry.init({
    dsn: "https://496cad94e9cd9a6ad4c2afb621055ae1@o4509758391582720.ingest.us.sentry.io/4509963881611264",
    sendDefaultPii: true,
  });
};

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

export { captureNewError, inititializeErrorHandling };
