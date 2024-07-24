import React from "react";
import ReactDOMServer from "react-dom/server";

const convertJSXToHTML = (element: React.ReactElement) => {
  return ReactDOMServer.renderToString(element);
};

export { convertJSXToHTML };
