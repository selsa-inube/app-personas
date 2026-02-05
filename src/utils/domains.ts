import { IOption } from "@inubekit/inubekit";

const convertDomainToOptions = (
  domainValues: Record<string, { id: string; value: string }>,
): IOption[] =>
  Object.values(domainValues)
    .map((domain) => ({
      id: domain.id,
      value: domain.id,
      label: domain.value,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

const convertDomainToOption = (domainValue: {
  id: string;
  value: string;
}): IOption => ({
  id: domainValue.id,
  value: domainValue.id,
  label: domainValue.value,
});

const convertDomainToList = (
  domainValues: Record<string, { id: string; value: string }>,
) => Object.values(domainValues).map((domain) => domain.value);

export { convertDomainToList, convertDomainToOptions, convertDomainToOption };
