function getBusinessUnitSubdomain() {
  const hostname = window.location.hostname;
  console.log(hostname);
  const parts = hostname.split(".");

  if (parts.length >= 3) {
    console.log(parts[0]);
    return parts[0];
  }

  return "fondecom";
}

export { getBusinessUnitSubdomain };
