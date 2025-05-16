import { ITagAppearance } from "@inubekit/inubekit";

const getTicketAvailableAppearance = (
  ticketsAvailable: number,
): ITagAppearance => {
  switch (true) {
    case ticketsAvailable === 0:
      return "danger";
    case ticketsAvailable > 0 && ticketsAvailable < 11:
      return "warning";
    case ticketsAvailable > 10:
      return "success";
    default:
      return "success";
  }
};

export { getTicketAvailableAppearance };
