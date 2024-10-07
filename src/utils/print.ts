import jsPDF from "jspdf";
import React from "react";
import ReactDOMServer from "react-dom/server";

const convertJSXToHTML = (element: React.ReactElement) => {
  return ReactDOMServer.renderToString(element);
};

const convertHTMLToPDF = (
  doc: jsPDF,
  html: string,
  callback: ((doc: jsPDF) => void) | undefined,
) => {
  doc.html(html, {
    callback,
    html2canvas: {
      scale: 0.5,
    },
    width: 397,
    windowWidth: 816,
    x: 0,
    y: 0,
  });
};

export { convertHTMLToPDF, convertJSXToHTML };
