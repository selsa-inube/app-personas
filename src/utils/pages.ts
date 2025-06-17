const scrollToBottom = (elementId: string) => {
  const mainEl = document.getElementById(elementId);
  if (!mainEl) return;

  const waitForRenderAndScroll = () => {
    requestAnimationFrame(() => {
      const newHeight = mainEl.scrollHeight;
      if (mainEl.scrollTop + mainEl.clientHeight < newHeight) {
        mainEl.scrollTo({
          top: newHeight,
          behavior: "smooth",
        });
      } else {
        waitForRenderAndScroll();
      }
    });
  };

  waitForRenderAndScroll();
};

export { scrollToBottom };
