import { BoxAttribute } from "@components/cards/BoxAttribute";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import {
  Blanket,
  Divider,
  Icon,
  ITagAppearance,
  Stack,
  Tag,
  Text,
} from "@inubekit/inubekit";
import { createPortal } from "react-dom";
import { MdOutlineClose } from "react-icons/md";
import { ITicket } from "src/model/entity/ticket";
import { StyledModal, StyledModalContent } from "./styles";

const getTicketAvailableAppearance = (
  ticketsAvailable: number,
): ITagAppearance => {
  switch (true) {
    case ticketsAvailable < 2:
      return "danger";
    case ticketsAvailable > 1 && ticketsAvailable < 11:
      return "warning";
    case ticketsAvailable > 10:
      return "success";
    default:
      return "success";
  }
};

interface TicketDetailsModalProps {
  ticket: ITicket;
  portalId: string;
  onCloseModal: () => void;
}

function TicketDetailsModal(props: TicketDetailsModalProps) {
  const { ticket, portalId, onCloseModal } = props;

  const isMobile = useMediaQuery("(max-width: 580px)");
  const node = document.getElementById(portalId);

  if (node === null) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly.",
    );
  }

  const withTicketsAvailable = ticket.ticketsAvailable > 0;

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <Stack direction="column" width="100%" gap={inube.spacing.s100}>
          <Stack justifyContent="space-between" alignItems="center">
            <Text type="title" size="medium" appearance="dark">
              Detalles
            </Text>

            <Icon
              appearance="dark"
              icon={<MdOutlineClose />}
              onClick={onCloseModal}
              cursorHover
              size="20px"
              spacing="narrow"
            />
          </Stack>
          <Text type="body" size="medium" appearance="gray">
            Información detallada del evento.
          </Text>
        </Stack>

        <Divider dashed />

        <StyledModalContent>
          <BoxAttribute label={ticket.title} />

          <BoxAttribute
            label="Descripción:"
            value={ticket.description}
            direction="column"
          />
          <BoxAttribute
            label="Entradas disponibles:"
            value={
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
            }
          />
          <BoxAttribute
            label="Entradas por usuario:"
            value={
              <Tag
                id={ticket.id}
                key={ticket.id}
                appearance="gray"
                label={ticket.entriesUser.toString()}
              />
            }
          />
        </StyledModalContent>
      </StyledModal>
    </Blanket>,
    node,
  );
}

export { TicketDetailsModal };
export type { TicketDetailsModalProps };
