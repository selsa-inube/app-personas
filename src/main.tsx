import { enviroment } from "@config/enviroment";
import { AuthProvider } from "@inube/auth";
import * as Sentry from "@sentry/react";
import { updateManifest } from "@utils/manifest";
import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";

if (enviroment.IS_PRODUCTION) {
  Sentry.init({
    dsn: "https://496cad94e9cd9a6ad4c2afb621055ae1@o4509758391582720.ingest.us.sentry.io/4509963881611264",
    sendDefaultPii: true,
  });
}

updateManifest();

const rootElement = document.getElementById("root");

const root = rootElement && ReactDOM.createRoot(rootElement);

root &&
  root.render(
    <React.StrictMode>
      <HelmetProvider>
        <AuthProvider
          clientId={enviroment.AUTH_CLIENT_ID}
          clientSecret={enviroment.AUTH_CLIENT_SECRET}
          provider={enviroment.AUTH_PROVIDER}
          realm={enviroment.AUTH_REALM}
          authorizationParams={{
            redirectUri: window.location.origin + window.location.pathname,
            scope: ["openid", "profile", "email"],
          }}
          isProduction={enviroment.IS_PRODUCTION}
          withSignOutTimeout={enviroment.WITH_AUTO_SIGNOUT}
          signOutTime={enviroment.SIGNOUT_TIME}
          redirectUrlOnTimeout="/session-expired"
          resetSignOutMouseMove={enviroment.RESET_SIGNOUT_MOUSE_MOVE}
          resetSignOutKeyDown={enviroment.RESET_SIGNOUT_KEY_DOWN}
          resetSignOutMouseDown={enviroment.RESET_SIGNOUT_MOUSE_DOWN}
          resetSignOutScroll={enviroment.RESET_SIGNOUT_SCROLL}
          resetSignOutTouchStart={enviroment.RESET_SIGNOUT_TOUCHSTART}
          resetSignOutChangePage={enviroment.RESET_SIGNOUT_CHANGE_PAGE}
          signOutCritialPaths={["/payments"]}
        >
          <App />
        </AuthProvider>
      </HelmetProvider>
    </React.StrictMode>,
  );
