import { useAuth } from "@inube/auth";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "src/context/app";
import { ITicket, IGroupTicket } from "src/model/entity/ticket";
import { TicketOptionsUI } from "./interface";
import { getTicketsForUser } from "src/services/iclient/tickets/getTickets";

function TicketOptions() {
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [groupTickets, setGroupTickets] = useState<IGroupTicket[]>([]);
  const [details, setDetails] = useState<{
    show: boolean;
    ticket?: ITicket;
  }>({
    show: false,
  });
  const { accessToken } = useAuth();
  const { user } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  const getTickets = async () => {
    if (!accessToken || !user.identification) return;

    setLoading(true);
    const newTickets = await getTicketsForUser(
      user.identification,
      accessToken,
    );

    setLoading(false);

    if (!newTickets) return;

    const groupedTickets = newTickets.reduce(
      (acc: IGroupTicket[], ticket: ITicket) => {
        const category = ticket.product || "Otros";
        const existingGroup = acc.find((group) => group.category === category);

        if (existingGroup) {
          existingGroup.tickets.push(ticket);
        } else {
          acc.push({
            category,
            categoryName: ticket.productName || "Otros",
            tickets: [ticket],
          });
        }

        return acc;
      },
      [],
    );

    setTickets(newTickets);
    setGroupTickets(groupedTickets);
  };

  useEffect(() => {
    getTickets();
  }, [accessToken, user.identification]);

  const handleOpenDetails = (ticketId: string) => {
    const ticket = tickets.find((ticket) => ticket.id === ticketId);

    if (ticket) {
      setDetails({ show: true, ticket });
    }
  };

  const handleCloseDetails = () => {
    setDetails({ show: false });
  };

  return (
    <TicketOptionsUI
      groupTickets={groupTickets}
      details={details}
      loading={loading}
      onOpenDetails={handleOpenDetails}
      onCloseDetails={handleCloseDetails}
    />
  );
}

export { TicketOptions };
