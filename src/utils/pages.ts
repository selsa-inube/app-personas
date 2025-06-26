const scrollToBottom = (elementId: string) => {
  const el = document.getElementById(elementId);
  if (!el) return;

  const waitForRenderAndScroll = () => {
    requestAnimationFrame(() => {
      const newHeight = el.scrollHeight;
      if (el.scrollTop + el.clientHeight < newHeight) {
        el.scrollTo({
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
