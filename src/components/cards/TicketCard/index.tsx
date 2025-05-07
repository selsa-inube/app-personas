import { inube } from "@design/tokens";
import {
  Button,
  ITagAppearance,
  Stack,
  Tag,
  Text,
  useMediaQuery,
} from "@inubekit/inubekit";
import { MdOutlinePayments } from "react-icons/md";
import { ITicket } from "src/model/entity/ticket";
import { OutlineCard } from "../OutlineCard";
import { StyledTitle } from "./styles";

const getTicketAvailableAppearance = (
  ticketsAvailable: number,
): ITagAppearance => {
  switch (true) {
    case ticketsAvailable < 1:
      return "gray";
    case ticketsAvailable === 1:
      return "danger";
    case ticketsAvailable > 1 && ticketsAvailable < 11:
      return "warning";
    case ticketsAvailable > 10:
      return "success";
    default:
      return "success";
  }
};

interface TicketCardProps {
  ticket: ITicket;
  onOpenDetails: (ticketId: string) => void;
}

function TicketCard(props: TicketCardProps) {
  const { ticket, onOpenDetails } = props;

  const isMobile = useMediaQuery("(max-width: 450px)");

  const withTicketsAvailable = ticket.ticketsAvailable > 0;

  return (
    <OutlineCard>
      <Stack direction="column" width="100%">
        <StyledTitle $isMobile={isMobile}>
          <Text
            type={isMobile ? "label" : "title"}
            size="medium"
            weight="bold"
            appearance="gray"
          >
            {ticket.title}
          </Text>
        </StyledTitle>

        <Stack
          direction="row"
          padding={
            isMobile
              ? inube.spacing.s150
              : `${inube.spacing.s150} ${inube.spacing.s250}`
          }
          gap={inube.spacing.s200}
          justifyContent="space-between"
        >
          <Stack gap={inube.spacing.s050} direction="column">
            <Text type="body" size="medium">
              {ticket.description}
            </Text>

            <Stack gap={inube.spacing.s075} alignItems="center">
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
            >
              Comprar
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </OutlineCard>
  );
}

export { TicketCard };
export type { TicketCardProps };
