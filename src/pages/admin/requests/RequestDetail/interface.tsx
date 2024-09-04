import { FileCard } from "@components/cards/FileCard";
import { ValidationCard } from "@components/cards/ValidationCard";
import { AttachDocumentModal } from "@components/modals/general/AttachDocumentModal";
import { Accordion } from "@design/data/Accordion";
import { Title } from "@design/data/Title";
import { Breadcrumbs } from "@design/navigation/Breadcrumbs";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Grid } from "@inubekit/grid";
import { Stack } from "@inubekit/stack";
import { Tag } from "@inubekit/tag";
import { Text } from "@inubekit/text";
import { MdArrowBack } from "react-icons/md";
import { IRequest } from "src/model/entity/request";
import { ISelectedDocument } from "src/model/entity/service";
import { currencyFormat } from "src/utils/currency";
import { formatPrimaryDate } from "src/utils/dates";
import { crumbsRequest } from "./config/navigation";

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
  onOpenAttachModal: (requirementId: string, documentType: string) => void;
  onCloseAttachModal: () => void;
  onSelectDocument: (document: ISelectedDocument) => void;
}

function RequestDetailUI(props: RequestUIProps) {
  const {
    selectedRequest,
    requestId,
    attachModal,
    maxFileSize,
    selectedDocuments,
    onCloseAttachModal,
    onSelectDocument,
  } = props;

  const isMobile = useMediaQuery("(max-width: 450px)");
  const isTablet = useMediaQuery("(max-width: 1100px)");

  return (
    <>
      <Stack
        direction="column"
        gap={
          isMobile
            ? inube.spacing.s300
            : isTablet
              ? inube.spacing.s500
              : inube.spacing.s600
        }
      >
        <Stack direction="column" gap={inube.spacing.s300}>
          <Breadcrumbs crumbs={crumbsRequest(requestId)} />
          <Title
            title="Detalles de solicitud"
            subtitle="Explora los detalles de tu solicitud"
            icon={<MdArrowBack />}
            navigatePage="/my-requests"
          />
        </Stack>

        <Stack direction="column" gap={inube.spacing.s300}>
          <Text type="title" size="medium" appearance="gray">
            Características
          </Text>

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
              <Stack direction="column" gap={inube.spacing.s150} width="100%">
                <Text type="label" size="large" appearance="gray">
                  Documentos adjuntos
                </Text>

                <Grid
                  autoRows="auto"
                  templateColumns={`repeat(${isMobile ? 1 : isTablet ? 2 : 3}, 1fr)`}
                  gap={inube.spacing.s200}
                >
                  {selectedDocuments.map((document) => (
                    <FileCard
                      key={document.id}
                      id={document.id}
                      name={document.file.name}
                      size={document.file.size}
                    />
                  ))}
                </Grid>
              </Stack>

              {/*  <Button
                iconBefore={<MdOutlineAdd />}
                variant="none"
                onClick={() => onOpenAttachModal("")}
              >
                Adjuntar documento
              </Button> */}
            </Stack>
          </Accordion>
        </Stack>
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
