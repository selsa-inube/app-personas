import { enviroment } from "@config/enviroment";
import { AuthProvider } from "@inube/auth";
import { updateManifest } from "@utils/manifest";
import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";

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
          signOutTimeout={enviroment.SIGNOUT_TIME}
          redirectUrlOnTimeout={enviroment.SIGNOUT_REDIRECT_URL}
          withSignOutTimeout={
            enviroment.WITH_AUTO_SIGNOUT === "true" ? true : false
          }
          resetSignOutMouseMove={
            enviroment.WITH_SIGNOUT_MOUSE_MOVE === "true" ? true : false
          }
          resetSignOutKeyDown={
            enviroment.WITH_SIGNOUT_KEY_DOWN === "true" ? true : false
          }
          resetSignOutMouseDown={
            enviroment.WITH_SIGNOUT_MOUSE_DOWN === "true" ? true : false
          }
          resetSignOutScroll={
            enviroment.WITH_SIGNOUT_SCROLL === "true" ? true : false
          }
          resetSignOutTouchStart={
            enviroment.WITH_SIGNOUT_TOUCHSTART === "true" ? true : false
          }
        >
          <App />
        </AuthProvider>
      </HelmetProvider>
    </React.StrictMode>,
  );
