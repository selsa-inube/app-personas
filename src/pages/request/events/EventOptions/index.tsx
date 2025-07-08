import { useAuth } from "@inube/auth";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "src/context/app";
import { IEvent, IGroupEvent } from "src/model/entity/event";
import { getEventsForUser } from "src/services/iclient/events/getEvents";
import { EventOptionsUI } from "./interface";

function EventOptions() {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [groupEvents, setGroupEvents] = useState<IGroupEvent[]>([]);
  const [details, setDetails] = useState<{ show: boolean; event?: IEvent }>({
    show: false,
  });
  const { accessToken } = useAuth();
  const { user } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getEvents = async () => {
    if (!accessToken || !user.identification) return;

    setLoading(true);
    setError(null);

    try {
      const newEvents = await getEventsForUser(
        user.identification,
        accessToken,
      );

      if (!newEvents) {
        setError("No se pudo obtener la información de eventos.");
        setGroupEvents([]);
        setEvents([]);
      } else if (newEvents.length === 0) {
        setGroupEvents([]);
        setEvents([]);
      } else {
        const groupedEvents = newEvents.reduce(
          (acc: IGroupEvent[], event: IEvent) => {
            const category = event.product || "Otros";
            const existingGroup = acc.find(
              (group) => group.category === category,
            );

            if (existingGroup) {
              existingGroup.events.push(event);
            } else {
              acc.push({
                category,
                categoryName: event.productName || "Otros",
                events: [event],
              });
            }
            return acc;
          },
          [],
        );

        setEvents(newEvents);
        setGroupEvents(groupedEvents);
      }
    } catch {
      setError(
        "Algo ha salido mal y no fue posible cargar los eventos disponibles. Vuelve a intentarlo más tarde.",
      );
      setGroupEvents([]);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEvents();
  }, [accessToken, user.identification]);

  const handleOpenDetails = (eventId: string) => {
    const event = events.find((event) => event.id === eventId);

    if (event) {
      setDetails({ show: true, event });
    }
  };

  const handleCloseDetails = () => {
    setDetails({ show: false });
  };

  return (
    <EventOptionsUI
      groupEvents={groupEvents}
      details={details}
      loading={loading}
      errorMessage={error}
      onOpenDetails={handleOpenDetails}
      onCloseDetails={handleCloseDetails}
    />
  );
}

export { EventOptions };
