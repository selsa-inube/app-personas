const DEFAULT_BUSINESS_UNIT = "fondecom";

function getBusinessUnitSubdomain() {
  const hostname = window.location.hostname;
  const parts = hostname.split(".");

  if (parts.length >= 3) {
    if (parts[0].includes("-")) {
      return DEFAULT_BUSINESS_UNIT;
    }

    return parts[0];
  }

  return DEFAULT_BUSINESS_UNIT;
}

export { getBusinessUnitSubdomain };
