import { enviroment } from "@config/enviroment";
import { AuthProvider } from "@inube/auth";
import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";

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
          <App />
        </AuthProvider>
      </HelmetProvider>
    </React.StrictMode>,
  );
