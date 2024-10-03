const mapLinkApiToEntity = (
  link: Record<string, string | number | object>,
): string => {
  return String(link.url);
};

export { mapLinkApiToEntity };
