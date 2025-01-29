function getClientSubdomain() {
  const hostname = window.location.hostname;
  const parts = hostname.split(".");

  if (parts.length >= 3) {
    return parts[0];
  }

  if (!import.meta.env.PROD) {
    return "Fondecom";
  }

  return;
}

export { getClientSubdomain };
