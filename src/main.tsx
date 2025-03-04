import { enviroment } from "@config/enviroment";
import { AuthProvider } from "@inube/auth";
import { updateManifest } from "@utils/manifest";
import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import { TimeProvider } from "./context/expiredSession";

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
        >
          <TimeProvider>
            <App />
          </TimeProvider>
        </AuthProvider>
      </HelmetProvider>
    </React.StrictMode>,
  );
