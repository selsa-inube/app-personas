import { BoxAttribute } from "@components/cards/BoxAttribute";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Blanket, Divider, Icon, Stack, Tag, Text } from "@inubekit/inubekit";
import { getTicketAvailableAppearance } from "@pages/request/events/EventOptions/utils";
import { formatPrimaryDate, formatPrimaryTimestamp } from "@utils/dates";
import { createPortal } from "react-dom";
import { MdOutlineClose } from "react-icons/md";
import { IEvent } from "src/model/entity/event";
import { StyledModal, StyledModalContent } from "./styles";

interface EventDetailsModalProps {
  event: IEvent;
  portalId: string;
  onCloseModal: () => void;
}

function EventDetailsModal(props: EventDetailsModalProps) {
  const { event, portalId, onCloseModal } = props;

  const isMobile = useMediaQuery("(max-width: 580px)");
  const node = document.getElementById(portalId);

  if (node === null) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly.",
    );
  }

  const withTicketsAvailable = event.ticketsAvailable > 0;

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
          <BoxAttribute label={event.title} />

          <BoxAttribute
            label="Descripción:"
            value={event.description}
            direction="column"
          />

          <BoxAttribute label="País:" value={event.countryName} />

          <BoxAttribute label="Departamento:" value={event.departmentName} />

          <BoxAttribute label="Ciudad:" value={event.cityName} />

          <BoxAttribute label="Dirección:" value={event.address} />

          <BoxAttribute
            label="Fecha de inicio:"
            value={formatPrimaryTimestamp(event.date)}
          />

          <BoxAttribute label="Hora de inicio:" value={event.initHour} />

          <BoxAttribute label="Hora finalización:" value={event.endHour} />

          <BoxAttribute
            label="Cierre de inscripciones:"
            value={formatPrimaryDate(event.deadlineDate)}
          />

          <BoxAttribute
            label="Entradas disponibles:"
            value={
              <Tag
                id={event.id}
                key={event.id}
                appearance={getTicketAvailableAppearance(
                  event.ticketsAvailable,
                )}
                label={
                  withTicketsAvailable
                    ? event.ticketsAvailable.toString()
                    : "Agotado"
                }
              />
            }
          />
          <BoxAttribute
            label="Entradas por usuario:"
            value={
              <Tag
                id={event.id}
                key={event.id}
                appearance="gray"
                label={event.entriesUser.toString()}
              />
            }
          />
        </StyledModalContent>
      </StyledModal>
    </Blanket>,
    node,
  );
}

export { EventDetailsModal };
export type { EventDetailsModalProps };
