import { useAuth } from "@inube/auth";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "src/context/app";
import { IGroupTicket, ITicket } from "src/model/entity/ticket";
import { captureNewError } from "src/services/errors/handleErrors";
import { getTicketsForUser } from "src/services/iclient/tickets/getTickets";
import { TicketOptionsUI } from "./interface";

function TicketOptions() {
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [groupTickets, setGroupTickets] = useState<IGroupTicket[]>([]);
  const [details, setDetails] = useState<{ show: boolean; ticket?: ITicket }>({
    show: false,
  });
  const { accessToken } = useAuth();
  const { user } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getTickets = async () => {
    if (!accessToken || !user.identification) return;

    setLoading(true);
    setError(null);

    try {
      const newTickets = await getTicketsForUser(
        user.identification,
        accessToken,
      );

      if (!newTickets) {
        setError("No se pudo obtener la información de boletería.");
        setGroupTickets([]);
        setTickets([]);
      } else if (newTickets.length === 0) {
        setGroupTickets([]);
        setTickets([]);
      } else {
        const groupedTickets = newTickets.reduce(
          (acc: IGroupTicket[], ticket: ITicket) => {
            const category = ticket.product || "Otros";
            const existingGroup = acc.find(
              (group) => group.category === category,
            );

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
      }
    } catch (error) {
      captureNewError(
        error,
        {
          inFunction: "getTickets",
          action: "getTicketsForUser",
          screen: "TicketOptions",
          file: "src/pages/request/tickets/TicketOptions/index.tsx",
        },
        { feature: "tickets" },
      );

      setError(
        "Algo ha salido mal y no fue posible cargar la boletería disponible. Vuelve a intentarlo más tarde.",
      );
      setGroupTickets([]);
      setTickets([]);
    } finally {
      setLoading(false);
    }
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
      errorMessage={error}
      onOpenDetails={handleOpenDetails}
      onCloseDetails={handleCloseDetails}
    />
  );
}

export { TicketOptions };
