import { TicketCard } from "@components/cards/TicketCard";
import { TicketDetailsModal } from "@components/modals/tickets/TicketDetailsModal";
import { Accordion } from "@design/data/Accordion";
import { Title } from "@design/data/Title";
import { inube } from "@design/tokens";
import { Breadcrumbs, Stack, useMediaQuery } from "@inubekit/inubekit";
import { MdArrowBack } from "react-icons/md";
import { IGroupTicket, ITicket } from "src/model/entity/ticket";
import { crumbsTickets } from "./config/navigation";

interface TicketOptionsUIProps {
  groupTickets: IGroupTicket[];
  details: {
    show: boolean;
    ticket?: ITicket;
  };
  onOpenDetails: (ticketId: string) => void;
  onCloseDetails: () => void;
}

function TicketOptionsUI(props: TicketOptionsUIProps) {
  const { groupTickets, details, onOpenDetails, onCloseDetails } = props;

  const isDesktop = useMediaQuery("(min-width: 1440px)");

  return (
    <>
      <Stack direction="column" gap={inube.spacing.s300}>
        <Breadcrumbs crumbs={crumbsTickets} />
        <Title
          title="Boletería"
          subtitle="Conoce la boletería que puedes adquirir."
          icon={<MdArrowBack />}
          navigatePage="/"
        />
      </Stack>

      <Stack
        direction="column"
        gap={inube.spacing.s300}
        margin={
          isDesktop ? `${inube.spacing.s600} 0 0` : `${inube.spacing.s300} 0 0`
        }
      >
        {groupTickets.map((group) => (
          <Accordion
            key={group.category}
            title={group.categoryName}
            tag={{
              appearance: "gray",
              label:
                group.tickets.length > 1
                  ? `${group.tickets.length} eventos`
                  : "1 evento",
              id: group.category,
              displayIcon: false,
            }}
            defaultOpen={false}
          >
            <Stack direction="column" gap={inube.spacing.s150} width="100%">
              {group.tickets.map((ticket) => (
                <TicketCard
                  key={ticket.id}
                  ticket={ticket}
                  onOpenDetails={onOpenDetails}
                />
              ))}
            </Stack>
          </Accordion>
        ))}
      </Stack>

      {details.show && details.ticket && (
        <TicketDetailsModal
          ticket={details.ticket}
          portalId="modals"
          onCloseModal={onCloseDetails}
        />
      )}
    </>
  );
}

export { TicketOptionsUI };
