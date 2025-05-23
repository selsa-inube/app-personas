import { inube } from "@design/tokens";
import { Button, Stack, Tag, Text, useMediaQuery } from "@inubekit/inubekit";
import { getTicketAvailableAppearance } from "@pages/request/events/EventOptions/utils";
import {
  formatPrimaryDate,
  getAbbreviatedMonthInSpanish,
  getDayInSpanish,
  getHourWithAmPm,
  getMonthInSpanish,
} from "@utils/dates";
import { MdEventAvailable } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IEvent } from "src/model/entity/event";
import { OutlineCard } from "../OutlineCard";
import { StyledDate } from "./styles";

interface EventCardProps {
  event: IEvent;
  onOpenDetails: (eventId: string) => void;
}

function EventCard(props: EventCardProps) {
  const { event, onOpenDetails } = props;
  const navigate = useNavigate();

  const isMobile = useMediaQuery("(max-width: 630px)");

  const withTicketsAvailable = event.ticketsAvailable > 0;

  const goToRegistration = () => {
    navigate("/events/registration", {
      state: { event },
    });
  };

  return (
    <OutlineCard>
      <Stack direction={isMobile ? "column" : "row"} width="100%">
        <StyledDate $isMobile={isMobile}>
          {isMobile ? (
            <>
              <Text
                type={isMobile ? "label" : "title"}
                size="large"
                appearance="gray"
                disabled={!withTicketsAvailable}
              >
                {getDayInSpanish(event.date)}, {event.date.getDate()} de{" "}
                {getMonthInSpanish(event.date)}
              </Text>

              <Text
                type={isMobile ? "label" : "title"}
                size={isMobile ? "medium" : "small"}
                appearance="gray"
                disabled={!withTicketsAvailable}
              >
                {getHourWithAmPm(event.date)}
              </Text>
            </>
          ) : (
            <>
              <Text
                type={isMobile ? "label" : "title"}
                size="medium"
                appearance="gray"
                disabled={!withTicketsAvailable}
              >
                {getDayInSpanish(event.date)}
              </Text>
              <Text
                type={isMobile ? "label" : "title"}
                size="large"
                weight="bold"
                appearance="gray"
                disabled={!withTicketsAvailable}
              >
                {event.date.getDate()}{" "}
                {getAbbreviatedMonthInSpanish(event.date, 3)}
              </Text>
              <Text
                type={isMobile ? "label" : "title"}
                size={isMobile ? "medium" : "small"}
                appearance="gray"
                disabled={!withTicketsAvailable}
              >
                {getHourWithAmPm(event.date)}
              </Text>
            </>
          )}
        </StyledDate>

        <Stack
          gap={inube.spacing.s150}
          padding={
            isMobile
              ? inube.spacing.s150
              : `${inube.spacing.s150} ${inube.spacing.s250}`
          }
          direction="column"
          width={isMobile ? "auto" : "100%"}
        >
          <Text
            type="title"
            size="medium"
            weight="bold"
            appearance={withTicketsAvailable ? "dark" : "gray"}
          >
            {event.title}
          </Text>

          <Stack
            gap={inube.spacing.s200}
            direction={isMobile ? "column" : "row"}
            justifyContent="space-between"
          >
            <Stack direction="column" gap={inube.spacing.s050}>
              <Stack
                gap={inube.spacing.s075}
                alignItems="center"
                wrap="wrap"
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
              </Stack>

              <Stack
                gap={inube.spacing.s075}
                wrap="wrap"
                direction={isMobile ? "column" : "row"}
              >
                <Text
                  type="label"
                  size={isMobile ? "medium" : "large"}
                  appearance="gray"
                >
                  Cierre de inscripciones:
                </Text>
                <Text
                  type="body"
                  size="medium"
                  appearance={withTicketsAvailable ? "dark" : "gray"}
                >
                  {formatPrimaryDate(event.deadlineDate)}
                </Text>
              </Stack>

              <Text
                onClick={() => onOpenDetails(event.id)}
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
                iconBefore={<MdEventAvailable />}
                disabled={!withTicketsAvailable}
                fullwidth={isMobile}
                onClick={goToRegistration}
              >
                Inscribirme
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </OutlineCard>
  );
}

export { EventCard };
export type { EventCardProps };
