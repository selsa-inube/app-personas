import { LiquidationCard } from "@components/cards/LiquidationCard";
import { RequestNews } from "@components/cards/RequestNews";
import { INew } from "@components/cards/RequestNews/types";
import { Accordion } from "@design/data/Accordion";
import { Title } from "@design/data/Title";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Breadcrumbs, Grid, Stack, Tabs, Tag, Text } from "@inubekit/inubekit";
import { MdArrowBack } from "react-icons/md";
import { IRequest } from "src/model/entity/request";
import { formatPrimaryDate, formatPrimaryTimestamp } from "src/utils/dates";
import { crumbsEntry } from "./config/navigation";
import { entryTabs } from "./config/tabs";

const renderItem = (label: string, value?: string, tag?: React.ReactNode) => (
  <Stack direction="column" gap={inube.spacing.s075}>
    <Text type="label" size="large" appearance="gray">
      {label}
    </Text>
    {tag ? (
      <Stack>{tag}</Stack>
    ) : (
      <Text type="body" size="medium">
        {value}
      </Text>
    )}
  </Stack>
);

interface EntryUIProps {
  selectedEntry: IRequest;
  entryId?: string;
  attachModal: {
    show: boolean;
    requirementId: string;
    documentType: string;
  };
  selectedTab: string;
  news: INew[];
  onOpenAttachModal: (requirementId: string, documentType: string) => void;
  onCloseAttachModal: () => void;
  onTabChange: (tabId: string) => void;
}

function EntryDetailUI(props: EntryUIProps) {
  const {
    selectedEntry,
    entryId,
    attachModal,
    selectedTab,
    news,
    onTabChange,
  } = props;

  const isMobile = useMediaQuery("(max-width: 450px)");
  const isDesktop = useMediaQuery("(min-width: 1200px)");

  return (
    <>
      <Stack direction="column" gap={inube.spacing.s600}>
        <Stack direction="column" gap={inube.spacing.s300}>
          <Breadcrumbs crumbs={crumbsEntry(entryId)} />
          <Title
            title="Detalles de solicitud"
            subtitle="Explora los detalles de tu solicitud"
            icon={<MdArrowBack />}
            navigatePage="/my-entries"
          />
        </Stack>

        {!isDesktop && (
          <Tabs
            onChange={onTabChange}
            selectedTab={selectedTab}
            tabs={Object.values(entryTabs)}
          />
        )}

        {((!isDesktop && selectedTab === entryTabs.features.id) ||
          isDesktop) && (
          <Grid
            gap={inube.spacing.s600}
            templateColumns={isDesktop ? "1fr 250px" : "1fr"}
          >
            <Stack direction="column" gap={inube.spacing.s300}>
              {isDesktop && (
                <Text type="title" size="medium" appearance="gray">
                  Características
                </Text>
              )}

              <Accordion title={selectedEntry.description}>
                <Grid
                  autoRows="auto"
                  templateColumns={`repeat(${isMobile ? 1 : 2}, 1fr)`}
                  gap={inube.spacing.s200}
                  width="100%"
                >
                  {renderItem(
                    "Estado:",
                    undefined,
                    <Tag
                      label={selectedEntry.tag.label}
                      appearance={selectedEntry.tag.appearance}
                    />,
                  )}

                  {selectedEntry.trackingCode &&
                    renderItem(
                      "Código de seguimiento:",
                      selectedEntry.trackingCode,
                    )}

                  {renderItem(
                    "Fecha de solicitud:",
                    formatPrimaryTimestamp(selectedEntry.requestDate, true),
                  )}
                </Grid>
              </Accordion>

              <Accordion title="Detalles del evento">
                <Grid
                  autoRows="auto"
                  templateColumns={`repeat(${isMobile ? 1 : 2}, 1fr)`}
                  gap={inube.spacing.s200}
                  width="100%"
                >
                  {renderItem("Pais:", selectedEntry?.event?.countryName)}
                  {renderItem(
                    "Departamento:",
                    selectedEntry?.event?.departmentName,
                  )}
                  {renderItem("Ciudad:", selectedEntry.event?.cityName)}
                  {renderItem("Dirección:", selectedEntry.event?.address)}
                  {renderItem(
                    "Fecha de inicio:",
                    formatPrimaryDate(
                      selectedEntry?.event?.date?.toString() || "",
                    ),
                  )}
                  {renderItem("Hora de inicio:", selectedEntry.event?.initHour)}
                  {renderItem(
                    "Hora de finalización:",
                    selectedEntry.event?.endHour,
                  )}
                </Grid>
              </Accordion>

              <Accordion title="Escoger entradas">
                <Grid
                  autoRows="auto"
                  templateColumns={`repeat(${isMobile ? 1 : 2}, 1fr)`}
                  gap={inube.spacing.s200}
                  width="100%"
                >
                  {selectedEntry?.entriesCategories?.map((entry) =>
                    renderItem(
                      entry.name,
                      undefined,
                      <Tag
                        label={String(entry.count || 0)}
                        appearance="gray"
                        displayIcon={false}
                      />,
                    ),
                  )}
                </Grid>
              </Accordion>

              <Accordion title="Liquidación">
                <Stack direction="column" gap={inube.spacing.s200} width="100%">
                  {selectedEntry?.entriesCategories?.map((category) => (
                    <LiquidationCard
                      key={category.id}
                      categoyName={category.name}
                      unitValue={category.value}
                      entriesCount={category.count || 0}
                      fullValue={
                        category.fullValue ||
                        (category?.subTotal || 0) - (category.subsidyValue || 0)
                      }
                      subTotal={category.subTotal || 0}
                      subsidyName={category.subsidyName}
                      subisidyValue={category.subsidyValue}
                    />
                  ))}
                </Stack>
              </Accordion>

              <Accordion title="Forma de pago">
                <Grid
                  autoRows="auto"
                  templateColumns={`repeat(${isMobile ? 1 : 2}, 1fr)`}
                  gap={inube.spacing.s200}
                  width="100%"
                >
                  {renderItem("Medio de pago:", "Débito automático")}
                  {renderItem("Numero de cuenta:", selectedEntry.accountNumber)}
                </Grid>
              </Accordion>
            </Stack>

            {isDesktop && <RequestNews news={news} />}
          </Grid>
        )}

        {!isDesktop && selectedTab === entryTabs.news.id && (
          <RequestNews news={news} />
        )}
      </Stack>

      {attachModal.show && <> </>}
    </>
  );
}

export { EntryDetailUI };
