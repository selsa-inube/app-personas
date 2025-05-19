import { EventCard } from "@components/cards/EventCard";
import { EventDetailsModal } from "@components/modals/events/EventDetailsModal";
import { Accordion } from "@design/data/Accordion";
import { Title } from "@design/data/Title";
import { inube } from "@design/tokens";
import { Breadcrumbs, Stack, Text, useMediaQuery } from "@inubekit/inubekit";
import { MdArrowBack } from "react-icons/md";
import { IEvent, IGroupEvent } from "src/model/entity/event";
import { crumbsEvents } from "./config/navigation";

interface EventOptionsUIProps {
  groupEvents: IGroupEvent[];
  details: {
    show: boolean;
    event?: IEvent;
  };
  onOpenDetails: (eventId: string) => void;
  onCloseDetails: () => void;
}

function EventOptionsUI(props: EventOptionsUIProps) {
  const { groupEvents, details, onOpenDetails, onCloseDetails } = props;

  const isDesktop = useMediaQuery("(min-width: 1440px)");

  return (
    <>
      <Stack direction="column" gap={inube.spacing.s300}>
        <Breadcrumbs crumbs={crumbsEvents} />
        <Title
          title="Eventos"
          subtitle="Conoce los eventos a los cuales puedes asistir."
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
        <Stack gap={inube.spacing.s100} direction="column">
          <Text type="title" size="medium" weight="bold">
            Programación de eventos
          </Text>
          <Text type="body" size="medium" appearance="gray">
            Aquí podrás encontrar la programación de eventos a los cuales puedes
            asistir. Haz clic en el botón inscribirme para iniciar tu proceso de
            reserva.
          </Text>
        </Stack>

        {groupEvents.map((group) => (
          <Accordion
            key={group.category}
            title={group.categoryName}
            tag={{
              appearance: "gray",
              label: group.events.length.toString(),
              id: group.category,
            }}
            defaultOpen={false}
          >
            <Stack direction="column" gap={inube.spacing.s150} width="100%">
              {group.events.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onOpenDetails={onOpenDetails}
                />
              ))}
            </Stack>
          </Accordion>
        ))}
      </Stack>

      {details.show && details.event && (
        <EventDetailsModal
          event={details.event}
          portalId="modals"
          onCloseModal={onCloseDetails}
        />
      )}
    </>
  );
}

export { EventOptionsUI };
