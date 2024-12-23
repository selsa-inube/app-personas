const mapMessageApiToEntity = (
  message: Record<string, string | number | object>,
): string => {
  return String(message.text) || "";
};

export { mapMessageApiToEntity };
