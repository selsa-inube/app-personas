import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const AUTH0_DOMAIN = import.meta.env.VITE_AUTH0_DOMAIN;
const AUTH0_CLIENT_ID = import.meta.env.VITE_AUTH0_CLIENT_ID;
const AUTH0_REDIRECT_URI = import.meta.env.VITE_AUTH0_REDIRECT_URI;

const PROD = import.meta.env.PROD;

const DOMAIN = import.meta.env.BASE_URL;
const DOMAIN2 = window.location.origin;

console.log(DOMAIN2);
console.log(DOMAIN);

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={AUTH0_DOMAIN}
      clientId={AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: PROD ? DOMAIN : AUTH0_REDIRECT_URI,
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
