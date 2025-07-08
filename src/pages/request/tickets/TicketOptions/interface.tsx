import { OutlineCard } from "@components/cards/OutlineCard";
import { TicketCard } from "@components/cards/TicketCard";
import { TicketDetailsModal } from "@components/modals/tickets/TicketDetailsModal";
import { Accordion } from "@design/data/Accordion";
import { Title } from "@design/data/Title";
import { inube } from "@design/tokens";
import {
  Breadcrumbs,
  Message,
  SkeletonIcon,
  SkeletonLine,
  Stack,
  useMediaQuery,
} from "@inubekit/inubekit";
import { MdArrowBack } from "react-icons/md";
import { IGroupTicket, ITicket } from "src/model/entity/ticket";
import { crumbsTickets } from "./config/navigation";

interface TicketOptionsUIProps {
  groupTickets: IGroupTicket[];
  details: {
    show: boolean;
    ticket?: ITicket;
  };
  loading?: boolean;
  errorMessage?: string | null;
  onOpenDetails: (ticketId: string) => void;
  onCloseDetails: () => void;
}

function TicketOptionsUI(props: TicketOptionsUIProps) {
  const { groupTickets, details, loading, errorMessage, onOpenDetails, onCloseDetails } =
    props;

  const isDesktop = useMediaQuery("(min-width: 1440px)");
  const isMobile = useMediaQuery("(max-width: 630px)");

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
        {loading &&
          Array.from({ length: 3 }).map((_, index) => (
            <OutlineCard key={index}>
              <Stack
                direction="row"
                gap={inube.spacing.s250}
                padding={
                  isMobile
                    ? `${inube.spacing.s150} ${inube.spacing.s200} `
                    : inube.spacing.s300
                }
                alignItems="center"
                justifyContent="space-between"
                width="100%"
              >
                {isMobile ? (
                  <Stack
                    direction="column"
                    gap={inube.spacing.s050}
                    width="100%"
                  >
                    <SkeletonLine width="80%" animated />
                    <SkeletonLine width="10%" animated />
                  </Stack>
                ) : (
                  <SkeletonLine width="40%" animated />
                )}

                {isMobile ? (
                  <SkeletonIcon animated size="20px" />
                ) : (
                  <Stack
                    direction="row"
                    gap={inube.spacing.s200}
                    alignItems="center"
                  >
                    <SkeletonIcon animated size="24px" />
                    <SkeletonIcon animated size="24px" />
                  </Stack>
                )}
              </Stack>
            </OutlineCard>
          ))}

        {!loading && (
          <>
            {errorMessage ? (
              <Message
                title={errorMessage}
                appearance="danger"
                size={isMobile ? "medium" : "large"}
              />
            ) : groupTickets.length === 0 ? (
              <Message
                title="Actualmente no hay boletas disponibles para adquirir."
                appearance="help"
                size={isMobile ? "medium" : "large"}
              />
            ) : (
              groupTickets.map((group) => (
                <Accordion
                  key={group.category}
                  title={group.categoryName}
                  tag={{
                    appearance: "gray",
                    label: group.tickets.length.toString(),
                    id: group.category,
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
              ))
            )}
          </>
        )}
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
