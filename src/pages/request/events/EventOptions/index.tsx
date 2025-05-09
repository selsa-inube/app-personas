import { useAuth } from "@inube/auth";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "src/context/app";
import { IEvent, IGroupEvent } from "src/model/entity/event";
import { getEventsForUser } from "src/services/iclient/events/getEvents";
import { EventOptionsUI } from "./interface";

function EventOptions() {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [groupEvents, setGroupEvents] = useState<IGroupEvent[]>([]);
  const [details, setDetails] = useState<{
    show: boolean;
    event?: IEvent;
  }>({
    show: false,
  });
  const { accessToken } = useAuth();
  const { user } = useContext(AppContext);

  const getEvents = async () => {
    if (!accessToken || !user.identification) return;

    const newEvents = await getEventsForUser(user.identification, accessToken);

    if (!newEvents) return;

    const groupedEvents = newEvents.reduce(
      (acc: IGroupEvent[], event: IEvent) => {
        const category = event.product || "Otros";
        const existingGroup = acc.find((group) => group.category === category);

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
      onOpenDetails={handleOpenDetails}
      onCloseDetails={handleCloseDetails}
    />
  );
}

export { EventOptions };
