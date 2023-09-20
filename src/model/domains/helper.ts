const convertDomainToOptions = (
  domainValues: Record<string, { id: string; value: string }>
) =>
  Object.values(domainValues).map((domain) => ({
    id: domain.id,
    value: domain.value,
  }));

const convertDomainToList = (
  domainValues: Record<string, { id: string; value: string }>
) => Object.values(domainValues).map((domain) => domain.value);

export { convertDomainToList, convertDomainToOptions };
