import * as Sentry from "@sentry/react";

const inititializeErrorHandling = () => {
  Sentry.init({
    dsn: "https://496cad94e9cd9a6ad4c2afb621055ae1@o4509758391582720.ingest.us.sentry.io/4509963881611264",
    sendDefaultPii: true,
  });
};

export { inititializeErrorHandling };
