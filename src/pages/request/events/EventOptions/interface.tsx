import { EventCard } from "@components/cards/EventCard";
import { OutlineCard } from "@components/cards/OutlineCard";
import { EventDetailsModal } from "@components/modals/events/EventDetailsModal";
import { Accordion } from "@design/data/Accordion";
import { Title } from "@design/data/Title";
import { inube } from "@design/tokens";
import {
  Breadcrumbs,
  Message,
  SkeletonIcon,
  SkeletonLine,
  Stack,
  Text,
  useMediaQuery,
} from "@inubekit/inubekit";
import { MdArrowBack } from "react-icons/md";
import { IEvent, IGroupEvent } from "src/model/entity/event";
import { crumbsEvents } from "./config/navigation";

interface EventOptionsUIProps {
  groupEvents: IGroupEvent[];
  details: {
    show: boolean;
    event?: IEvent;
  };
  loading?: boolean;
  errorMessage?: string | null;
  onOpenDetails: (eventId: string) => void;
  onCloseDetails: () => void;
}

function EventOptionsUI(props: EventOptionsUIProps) {
  const {
    groupEvents,
    details,
    loading,
    errorMessage,
    onOpenDetails,
    onCloseDetails,
  } = props;

  const isDesktop = useMediaQuery("(min-width: 1440px)");

  const isMobile = useMediaQuery("(max-width: 630px)");

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
            ) : groupEvents.length === 0 ? (
              <Message
                title="Actualmente no hay eventos disponibles para asistir."
                appearance="help"
                size={isMobile ? "medium" : "large"}
              />
            ) : (
              groupEvents.map((group) => (
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
                  <Stack
                    direction="column"
                    gap={inube.spacing.s150}
                    width="100%"
                  >
                    {group.events.map((event) => (
                      <EventCard
                        key={event.id}
                        event={event}
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
