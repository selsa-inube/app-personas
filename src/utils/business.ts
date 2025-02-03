function getBusinessUnitSubdomain() {
  const hostname = window.location.hostname;
  const parts = hostname.split(".");

  if (parts.length >= 3) {
    return parts[0];
  }

  if (import.meta.env.DEV) {
    return import.meta.env.VITE_DEV_BUNIT;
  }
  return "";
}

export { getBusinessUnitSubdomain };
