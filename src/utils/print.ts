import React from "react";
import ReactDOMServer from "react-dom/server";

const copyElementToIFrame = (
  fromElement: React.ReactElement | HTMLElement,
  toElement: HTMLIFrameElement,
) => {
  let contentToCopy;

  if (React.isValidElement(fromElement)) {
    contentToCopy = ReactDOMServer.renderToString(fromElement);
  } else if (fromElement instanceof HTMLElement) {
    contentToCopy = fromElement.innerHTML;
  } else {
    throw new Error(
      "Invalid fromElement: must be a React element or HTMLElement",
    );
  }

  const iframeDoc =
    toElement.contentDocument || toElement?.contentWindow?.document;

  if (!iframeDoc) return;

  iframeDoc.open();
  iframeDoc.write(contentToCopy);
  iframeDoc.close();

  const iframeHead = iframeDoc.head;

  Array.from(document.head.getElementsByTagName("style")).forEach((style) => {
    const newStyle = iframeDoc.createElement("style");
    newStyle.innerHTML = style.innerHTML;
    iframeHead.appendChild(newStyle);
  });

  Array.from(document.head.getElementsByTagName("link")).forEach((link) => {
    const newLink = iframeDoc.createElement("link");
    newLink.rel = "stylesheet";
    newLink.href = link.href;
    iframeHead.appendChild(newLink);
  });
};

export { copyElementToIFrame };
