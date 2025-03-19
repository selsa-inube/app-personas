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
          withSignOutTimeout={enviroment.WITH_AUTO_SIGNOUT}
          signOutTime={enviroment.SIGNOUT_TIME}
          redirectUrlOnTimeout="/session-expired"
          resetSignOutMouseMove={enviroment.WITH_SIGNOUT_MOUSE_MOVE}
          resetSignOutKeyDown={enviroment.WITH_SIGNOUT_KEY_DOWN}
          resetSignOutMouseDown={enviroment.WITH_SIGNOUT_MOUSE_DOWN}
          resetSignOutScroll={enviroment.WITH_SIGNOUT_SCROLL}
          resetSignOutTouchStart={enviroment.WITH_SIGNOUT_TOUCHSTART}
          signOutCritialPaths={["/payments"]}
        >
          <App />
        </AuthProvider>
      </HelmetProvider>
    </React.StrictMode>,
  );
