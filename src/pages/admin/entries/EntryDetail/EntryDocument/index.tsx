import { BoxAttribute } from "@components/cards/BoxAttribute";
import { OutlineCard } from "@components/cards/OutlineCard";
import { inube } from "@design/tokens";
import { Grid, Stack, Tag, Text } from "@inubekit/inubekit";
import { formatPrimaryTimestamp } from "@utils/dates";
import { IServiceDomains } from "src/context/app/types";
import { IRequest } from "src/model/entity/request";
import { currencyFormat } from "src/utils/currency";
import { StyledEndEntry, StyledLogo } from "./styles";

interface EntryDocumentProps {
  selectedEntry: IRequest;
  logoUrl: string;
  serviceDomains: IServiceDomains;
}

function EntryDocument(props: EntryDocumentProps) {
  const { selectedEntry, logoUrl, serviceDomains } = props;

  const numberOfAttendees = Number(
    selectedEntry.entriesCategories?.reduce(
      (acc: number, entry: { count?: number }) => acc + (entry.count || 0),
      0,
    ) || 0,
  );

  return (
    <Stack
      padding={`0 ${inube.spacing.s800}`}
      gap={inube.spacing.s450}
      width="21cm"
      direction="column"
    >
      <Stack justifyContent="flex-start" width="100%">
        <StyledLogo src={logoUrl} />
      </Stack>

      <Text type="title" size="large" weight="bold">
        Comprobante de entrada
      </Text>

      <Stack direction="column" gap={inube.spacing.s250}>
        <OutlineCard>
          <Grid autoRows="auto" templateColumns={`1fr 220px`} width="100%">
            <Stack
              direction="column"
              gap={inube.spacing.s200}
              padding={inube.spacing.s300}
            >
              <Text type="headline" size="small" weight="bold">
                {selectedEntry?.event?.description}
              </Text>

              <Stack
                direction="row"
                gap={inube.spacing.s200}
                justifyContent="space-between"
              >
                <Stack direction="column" gap={inube.spacing.s050}>
                  <Stack
                    gap={inube.spacing.s100}
                    alignItems="center"
                    wrap="wrap"
                    justifyContent={"flex-start"}
                  >
                    <Text type="label" size={"large"} appearance="gray">
                      Estado de la entrada:
                    </Text>
                    <Tag
                      label={selectedEntry.tag.label}
                      appearance={selectedEntry.tag.appearance}
                      displayIcon={false}
                    />
                  </Stack>

                  <Stack gap={inube.spacing.s100} wrap="wrap" direction={"row"}>
                    <Text
                      type="label"
                      size="large"
                      appearance="gray"
                      weight="bold"
                    >
                      Fecha de solicitud:
                    </Text>
                    <Text
                      type="label"
                      size="large"
                      appearance="gray"
                      weight="bold"
                    >
                      {formatPrimaryTimestamp(selectedEntry?.requestDate, true)}
                    </Text>
                  </Stack>

                  <Stack gap={inube.spacing.s100} wrap="wrap" direction={"row"}>
                    <Text
                      type="label"
                      size="large"
                      appearance="gray"
                      weight="bold"
                    >
                      Numero de asistentes:
                    </Text>
                    <Text
                      type="label"
                      size="large"
                      appearance="gray"
                      weight="bold"
                    >
                      {numberOfAttendees}
                    </Text>
                  </Stack>
                </Stack>

                <Stack
                  direction="column"
                  alignItems="flex-end"
                  justifyContent="flex-end"
                >
                  <StyledLogo src={logoUrl} />
                </Stack>
              </Stack>
            </Stack>

            <StyledEndEntry>
              <Text type="headline" size="large" weight="bold">
                {currencyFormat(selectedEntry.value || 0)}
              </Text>

              {selectedEntry.trackingCode && (
                <Stack direction="column">
                  <Text type="label" size="large" weight="bold">
                    Código de seguimiento:
                  </Text>

                  <Text
                    type="label"
                    size="large"
                    weight="bold"
                    appearance="gray"
                  >
                    {selectedEntry.trackingCode}
                  </Text>
                </Stack>
              )}
            </StyledEndEntry>
          </Grid>
        </OutlineCard>

        {selectedEntry.event?.type === "Event" && (
          <OutlineCard>
            <Stack
              direction="column"
              gap={inube.spacing.s150}
              padding={inube.spacing.s150}
              width="100%"
            >
              <Text type="label" size="large" weight="bold" appearance="gray">
                Detalles de evento
              </Text>

              <Grid
                templateColumns="1fr 1fr"
                autoRows="auto"
                gap={inube.spacing.s100}
                width="100%"
              >
                <BoxAttribute
                  label="País"
                  value={selectedEntry.event?.countryName}
                />

                <BoxAttribute
                  label="Departamento"
                  value={selectedEntry.event?.departmentName}
                />

                <BoxAttribute
                  label="Ciudad"
                  value={selectedEntry.event?.cityName}
                />

                <BoxAttribute
                  label="Dirección"
                  value={selectedEntry.event?.address}
                />

                {selectedEntry.event?.date && (
                  <BoxAttribute
                    label="Fecha de inicio"
                    value={formatPrimaryTimestamp(
                      new Date(selectedEntry.event.date),
                    )}
                  />
                )}

                <BoxAttribute
                  label="Hora de inicio"
                  value={selectedEntry.event?.initHour}
                />

                <BoxAttribute
                  label="Hora de finalización"
                  value={selectedEntry.event?.endHour}
                />
              </Grid>
            </Stack>
          </OutlineCard>
        )}

        <OutlineCard>
          <Stack
            direction="column"
            gap={inube.spacing.s150}
            padding={inube.spacing.s150}
            width="100%"
          >
            <Text type="label" size="large" weight="bold" appearance="gray">
              Participantes
            </Text>

            <Grid
              templateColumns="1fr 1fr"
              autoRows="auto"
              gap={inube.spacing.s100}
              width="100%"
            >
              {selectedEntry.event?.entryType === "OpenEntries"
                ? selectedEntry.entriesCategories?.map((entry) => (
                    <BoxAttribute
                      key={entry.id}
                      label={entry.name}
                      value={String(entry.count || 0)}
                    />
                  ))
                : selectedEntry.participants &&
                  selectedEntry.participants.map((participant) => (
                    <BoxAttribute
                      key={participant.identificationNumber}
                      label={
                        serviceDomains.valueOf(
                          participant.relationship || "",
                          "relationshiptheowner",
                        )?.label
                      }
                      value={participant.name}
                    />
                  ))}
            </Grid>
          </Stack>
        </OutlineCard>

        <OutlineCard>
          <Stack
            direction="column"
            gap={inube.spacing.s150}
            padding={inube.spacing.s150}
            width="100%"
          >
            <Text type="label" size="large" weight="bold" appearance="gray">
              Forma de pago
            </Text>

            <Grid
              templateColumns="1fr 1fr"
              autoRows="auto"
              gap={inube.spacing.s100}
              width="100%"
            >
              <BoxAttribute label="Medio de pago" value="Débito automático" />

              <BoxAttribute
                label="Numero de cuenta"
                value={selectedEntry.accountNumber}
              />
            </Grid>
          </Stack>
        </OutlineCard>
      </Stack>
    </Stack>
  );
}

export { EntryDocument };
