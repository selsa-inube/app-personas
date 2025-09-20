import { inube } from "@design/tokens";
import { Button, Stack, Tag, Text, useMediaQuery } from "@inubekit/inubekit";
import { getTicketAvailableAppearance } from "@pages/request/events/EventOptions/utils";
import { MdOutlinePayments } from "react-icons/md";
import { ITicket } from "src/model/entity/ticket";
import { OutlineCard } from "../OutlineCard";
import { useNavigate } from "react-router";

interface TicketCardProps {
  ticket: ITicket;
  onOpenDetails: (ticketId: string) => void;
}

function TicketCard(props: TicketCardProps) {
  const { ticket, onOpenDetails } = props;
  const navigate = useNavigate();

  const isMobile = useMediaQuery("(max-width: 620px)");

  const withTicketsAvailable = ticket.ticketsAvailable > 0;

  const goToRegistration = () => {
    navigate("/events/registration", {
      state: { event: ticket },
    });
  };

  return (
    <OutlineCard>
      <Stack
        direction="column"
        width="100%"
        padding={
          isMobile
            ? inube.spacing.s150
            : `${inube.spacing.s150} ${inube.spacing.s250}`
        }
        gap={inube.spacing.s150}
      >
        <Text
          type="title"
          size={isMobile ? "small" : "medium"}
          weight="bold"
          appearance={!withTicketsAvailable ? "gray" : "dark"}
        >
          {ticket.title}
        </Text>

        <Stack
          direction={isMobile ? "column" : "row"}
          gap={inube.spacing.s050}
          justifyContent="space-between"
        >
          <Stack gap={inube.spacing.s050} direction="column">
            <Text type="body" size={isMobile ? "small" : "medium"}>
              {ticket.description.length > 121
                ? `${ticket.description.substring(0, 117)}...`
                : ticket.description}
            </Text>

            <Stack
              gap={inube.spacing.s075}
              alignItems="center"
              justifyContent={isMobile ? "space-between" : "flex-start"}
            >
              <Text
                type="label"
                size={isMobile ? "medium" : "large"}
                appearance="gray"
              >
                Entradas disponibles:
              </Text>

              <Tag
                id={ticket.id}
                key={ticket.id}
                appearance={getTicketAvailableAppearance(
                  ticket.ticketsAvailable,
                )}
                label={
                  withTicketsAvailable
                    ? ticket.ticketsAvailable.toString()
                    : "Agotado"
                }
              />
            </Stack>

            <Text
              onClick={() => onOpenDetails(ticket.id)}
              cursorHover={withTicketsAvailable}
              appearance={withTicketsAvailable ? "primary" : "gray"}
              type="label"
              size="large"
              weight="bold"
              disabled={!withTicketsAvailable}
            >
              Ver detalles
            </Text>
          </Stack>

          <Stack justifyContent="flex-end" direction="column">
            <Button
              spacing="compact"
              appearance={withTicketsAvailable ? "primary" : "gray"}
              variant="outlined"
              iconBefore={<MdOutlinePayments />}
              disabled={!withTicketsAvailable}
              fullwidth={isMobile}
              onClick={goToRegistration}
            >
              Adquirir
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </OutlineCard>
  );
}

export { TicketCard };
export type { TicketCardProps };
