import { OutlineCard } from "@components/cards/OutlineCard";
import { RequestNews } from "@components/cards/RequestNews";
import { ValidationCard } from "@components/cards/ValidationCard";
import { AttachDocumentModal } from "@components/modals/general/AttachDocumentModal";
import { Accordion } from "@design/data/Accordion";
import { Title } from "@design/data/Title";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Breadcrumbs } from "@inubekit/breadcrumbs";
import { Button } from "@inubekit/button";
import { Divider } from "@inubekit/divider";
import { Grid } from "@inubekit/grid";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/stack";
import { Tabs } from "@inubekit/tabs";
import { Tag } from "@inubekit/tag";
import { Text } from "@inubekit/text";
import {
  MdArrowBack,
  MdDeleteOutline,
  MdOutlineDescription,
} from "react-icons/md";
import { IRequest } from "src/model/entity/request";
import { ISelectedDocument } from "src/model/entity/service";
import { currencyFormat } from "src/utils/currency";
import { formatPrimaryDate } from "src/utils/dates";
import { truncateFileName } from "src/utils/texts";
import { crumbsRequest } from "./config/navigation";
import { requestTabs } from "./config/tabs";

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

function renderDocument(
  key: number,
  label: string,
  requirementId: string,
  documentType: string,
  selectedDocuments: ISelectedDocument[],
  onAttachDocument: (requirementId: string, documentType: string) => void,
  onRemove: (id: string, documentType?: string, sequence?: number) => void,
) {
  const selectedFiles = selectedDocuments.filter(
    (doc) => doc.requirementId === requirementId,
  );

  return (
    <OutlineCard key={requirementId}>
      <Stack
        padding={`${inube.spacing.s150} ${inube.spacing.s200}`}
        direction="column"
        gap={inube.spacing.s150}
        width="100%"
      >
        <Stack
          justifyContent="space-between"
          alignItems="center"
          height="fit-content"
        >
          <Text type="label" size="large">
            {label}
          </Text>

          <Button
            variant="none"
            onClick={() => onAttachDocument(requirementId, documentType)}
            disabled
          >
            Adjuntar
          </Button>
        </Stack>

        {selectedFiles.map((document) => (
          <>
            <Divider dashed />
            <Stack gap={inube.spacing.s150} alignItems="center" width="100%">
              <Icon
                icon={<MdOutlineDescription />}
                appearance="dark"
                size="24px"
                spacing="narrow"
                cursorHover
              />

              <Stack
                justifyContent="space-between"
                width="100%"
                alignItems="center"
              >
                <Stack direction="column" gap={inube.spacing.s050} width="100%">
                  <Text type="label" size="medium">
                    {truncateFileName(document.file.name, 20)}
                  </Text>

                  <Text type="body" size="small" appearance="gray">
                    {(document.file.size / 1024).toFixed(2)} KB
                  </Text>
                </Stack>

                <Icon
                  icon={<MdDeleteOutline />}
                  appearance="danger"
                  size="20px"
                  spacing="narrow"
                  cursorHover
                  onClick={() =>
                    onRemove(
                      document.id,
                      document.documentType,
                      document.sequence,
                    )
                  }
                />
              </Stack>
            </Stack>
          </>
        ))}
      </Stack>
    </OutlineCard>
  );
}

interface RequestUIProps {
  selectedRequest: IRequest;
  requestId?: string;
  attachModal: {
    show: boolean;
    requirementId: string;
    documentType: string;
  };
  maxFileSize: number;
  selectedDocuments: ISelectedDocument[];
  selectedTab: string;
  onOpenAttachModal: (requirementId: string, documentType: string) => void;
  onCloseAttachModal: () => void;
  onSelectDocument: (document: ISelectedDocument) => void;
  onRemoveDocument: (
    id: string,
    documentType?: string,
    sequence?: number,
  ) => void;
  onTabChange: (tabId: string) => void;
}

function RequestDetailUI(props: RequestUIProps) {
  const {
    selectedRequest,
    requestId,
    attachModal,
    maxFileSize,
    selectedDocuments,
    selectedTab,
    onOpenAttachModal,
    onCloseAttachModal,
    onSelectDocument,
    onRemoveDocument,
    onTabChange,
  } = props;

  const isMobile = useMediaQuery("(max-width: 450px)");
  const isTablet = useMediaQuery("(max-width: 1100px)");
  const isDesktop = useMediaQuery("(min-width: 1200px)");

  return (
    <>
      <Stack direction="column" gap={inube.spacing.s300}>
        <Stack direction="column" gap={inube.spacing.s300}>
          <Breadcrumbs crumbs={crumbsRequest(requestId)} />
          <Title
            title="Detalles de solicitud"
            subtitle="Explora los detalles de tu solicitud"
            icon={<MdArrowBack />}
            navigatePage="/my-requests"
          />
        </Stack>
        {!isDesktop && (
          <Tabs
            onChange={onTabChange}
            selectedTab={selectedTab}
            tabs={Object.values(requestTabs)}
          />
        )}

        {((!isDesktop && selectedTab === requestTabs.features.id) ||
          isDesktop) && (
          <Grid
            gap={inube.spacing.s600}
            templateColumns={isDesktop ? "1fr 250px" : "1fr"}
            margin={isDesktop ? `${inube.spacing.s600} 0 0` : `0`}
          >
            <Stack direction="column" gap={inube.spacing.s300}>
              {isDesktop && (
                <Text type="title" size="medium" appearance="gray">
                  Características
                </Text>
              )}

              <Accordion title={selectedRequest.description}>
                <Grid
                  autoRows="auto"
                  templateColumns={`repeat(${isMobile ? 1 : isTablet ? 2 : 3}, 1fr)`}
                  gap={inube.spacing.s200}
                  width="100%"
                >
                  {renderItem(
                    "Estado:",
                    undefined,
                    <Tag
                      label={selectedRequest.tag.label}
                      appearance={selectedRequest.tag.appearance}
                      weight="normal"
                    />,
                  )}
                  {renderItem("Producto:", selectedRequest.product)}
                  {renderItem("Destino:", selectedRequest.destination)}
                  {renderItem(
                    "Código de seguimiento:",
                    selectedRequest.trackingCode,
                  )}
                  {renderItem(
                    "Fecha de solicitud:",
                    formatPrimaryDate(selectedRequest.requestDate, true),
                  )}
                  {renderItem(
                    "Valor de la solicitud:",
                    currencyFormat(selectedRequest.value),
                  )}
                </Grid>
              </Accordion>

              <Accordion title="Condiciones del crédito">
                <Grid
                  autoRows="auto"
                  templateColumns={`repeat(${isMobile ? 1 : isTablet ? 2 : 3}, 1fr)`}
                  gap={inube.spacing.s200}
                  width="100%"
                >
                  {renderItem(
                    "Cuota:",
                    `${currencyFormat(selectedRequest.quotaValue)} / ${selectedRequest.periodicity}`,
                  )}
                  {renderItem("Plazo:", `${selectedRequest.deadline} Meses`)}
                  {renderItem(
                    "Tasa de interés:",
                    `${selectedRequest.interestRate} % N.A.M.V`,
                  )}
                  {renderItem(
                    "Desembolso aproximado:",
                    currencyFormat(selectedRequest.netValue),
                  )}
                </Grid>
              </Accordion>

              <Accordion title="Validaciones del sistema">
                <Grid
                  autoRows="auto"
                  templateColumns={`repeat(${isMobile ? 1 : isTablet ? 2 : 3}, 1fr)`}
                  gap={inube.spacing.s200}
                  width="100%"
                >
                  {selectedRequest.validations.map((validation) => (
                    <ValidationCard
                      key={validation.id}
                      id={validation.id}
                      label={validation.label}
                      failDetails={validation.failDetails}
                      isRequired={validation.isRequired}
                      pending={validation.pending}
                      value={validation.value}
                    />
                  ))}
                </Grid>
              </Accordion>

              <Accordion title="Requisitos documentales">
                <Stack
                  direction="column"
                  gap={inube.spacing.s200}
                  alignItems="flex-end"
                  width="100%"
                >
                  <Stack
                    gap={inube.spacing.s200}
                    direction="column"
                    width="100%"
                  >
                    {selectedRequest.documentaryRequirements.map(
                      (document, index) =>
                        document.documentType &&
                        renderDocument(
                          index,
                          document.file.name,
                          document.id,
                          document.documentType,
                          selectedDocuments,
                          onOpenAttachModal,
                          onRemoveDocument,
                        ),
                    )}
                  </Stack>
                </Stack>
              </Accordion>
            </Stack>

            {isDesktop && <RequestNews news={[]} />}
          </Grid>
        )}

        {!isDesktop && selectedTab === requestTabs.news.id && (
          <RequestNews news={[]} />
        )}
      </Stack>

      {attachModal.show && (
        <AttachDocumentModal
          portalId="modals"
          maxFileSize={maxFileSize}
          documentType={attachModal.documentType}
          requirementId={attachModal.requirementId}
          onSelectDocuments={(files) => onSelectDocument(files[0])}
          onCloseModal={onCloseAttachModal}
        />
      )}
    </>
  );
}

export { RequestDetailUI };
