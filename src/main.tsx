import { enviroment } from "@config/enviroment";
import { AuthProvider } from "@inube/auth";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById("root");

const root = rootElement && ReactDOM.createRoot(rootElement);

root &&
  root.render(
    <React.StrictMode>
      <AuthProvider
        clientId={enviroment.CLIENT_ID}
        clientSecret={enviroment.CLIENT_SECRET}
        provider={enviroment.PROVIDER}
        realm={enviroment.REALM}
        authorizationParams={{
          redirectUri: enviroment.REDIRECT_URI,
          scope: ["openid", "profile", "email"],
        }}
        isProduction={enviroment.IS_PRODUCTION}
      >
        <App />
      </AuthProvider>
    </React.StrictMode>,
  );
