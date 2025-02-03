function getBusinessUnitSubdomain() {
  const hostname = window.location.hostname;
  const parts = hostname.split(".");

  if (parts.length >= 3) {
    return parts[0];
  }

  return "fondecom"; 
}

export { getBusinessUnitSubdomain };
