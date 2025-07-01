import { OutlineCard } from "@components/cards/OutlineCard";
import { RequestNews } from "@components/cards/RequestNews";
import { INew } from "@components/cards/RequestNews/types";
import { ValidationCard } from "@components/cards/ValidationCard";
import { AttachDocumentModal } from "@components/modals/general/AttachDocumentModal";
import { Accordion } from "@design/data/Accordion";
import { Title } from "@design/data/Title";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import {
  Breadcrumbs,
  Button,
  Divider,
  Grid,
  Icon,
  Message,
  Stack,
  Tabs,
  Tag,
  Text,
} from "@inubekit/inubekit";
import {
  MdArrowBack,
  MdDeleteOutline,
  MdOutlineDescription,
} from "react-icons/md";
import { IServiceDomains } from "src/context/app/types";
import { activeDM } from "src/model/domains/general/activedm";
import { IRequest } from "src/model/entity/request";
import { ISelectedDocument } from "src/model/entity/service";
import { currencyFormat } from "src/utils/currency";
import { formatPrimaryTimestamp } from "src/utils/dates";
import { truncateFileName } from "src/utils/texts";
import { crumbsRequest } from "./config/navigation";
import { requestTabs } from "./config/tabs";
import { StyledTextGrayContainer } from "./styles";

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
  news: INew[];
  serviceDomains: IServiceDomains;
  onOpenAttachModal: (requirementId: string, documentType: string) => void;
  onCloseAttachModal: () => void;
  onSelectDocument: (document: ISelectedDocument[]) => void;
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
    news,
    serviceDomains,
    onOpenAttachModal,
    onCloseAttachModal,
    onSelectDocument,
    onRemoveDocument,
    onTabChange,
  } = props;

  const isMobile = useMediaQuery("(max-width: 450px)");
  const isDesktop = useMediaQuery("(min-width: 1200px)");

  const requiredValidations = selectedRequest.validations?.filter(
    (validation) => validation.required,
  );

  const failValidations = requiredValidations?.filter(
    (validation) => validation.value === "fail",
  );

  const pendingValidations = requiredValidations?.filter(
    (validation) => validation.value === "pending",
  );

  return (
    <>
      <Stack direction="column" gap={inube.spacing.s600}>
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
                  templateColumns={`repeat(${isMobile ? 1 : 2}, 1fr)`}
                  gap={inube.spacing.s200}
                  width="100%"
                >
                  {renderItem(
                    "Estado:",
                    undefined,
                    <Tag
                      label={selectedRequest.tag.label}
                      appearance={selectedRequest.tag.appearance}
                    />,
                  )}

                  {selectedRequest.requestType === "updatedata" &&
                    selectedRequest?.customerName &&
                    renderItem("Nombre", selectedRequest?.customerName)}

                  {selectedRequest.requestType === "updatedata" &&
                    selectedRequest?.identificationType &&
                    renderItem(
                      "Tipo de identificación:",
                      serviceDomains.valueOf(
                        selectedRequest?.identificationType,
                        "identificationtype",
                      )?.label,
                    )}

                  {selectedRequest.requestType === "updatedata" &&
                    selectedRequest?.customerCode &&
                    renderItem(
                      "Número de identificación:",
                      selectedRequest?.customerCode,
                    )}

                  {selectedRequest.deadline &&
                    selectedRequest.requestType === "newcdat" &&
                    renderItem("Plazo:", selectedRequest.deadline)}

                  {selectedRequest.actionAfterExpiration &&
                    selectedRequest.requestType === "newcdat" &&
                    renderItem(
                      "Renovar producto al vencimiento:",
                      selectedRequest.actionAfterExpiration,
                    )}

                  {["credit", "aid", "newprogrammedsaving", "newcdat"].includes(
                    selectedRequest.requestType,
                  ) &&
                    selectedRequest.product &&
                    renderItem("Producto:", selectedRequest.product)}

                  {[
                    "cancelprogrammedsaving",
                    "modifydeadlineactionprogrammedsaving",
                    "cancelcdat",
                    "modifydeadlineactioncdat",
                    "modifyquotavalueprogrammedsaving",
                  ].includes(selectedRequest.requestType) &&
                    selectedRequest.product &&
                    renderItem("Número de producto:", selectedRequest.product)}

                  {(selectedRequest.requestType ===
                    "modifydeadlineactionprogrammedsaving" ||
                    selectedRequest.requestType ===
                      "modifydeadlineactioncdat") &&
                    selectedRequest.product &&
                    renderItem(
                      "Renovar producto al vencimiento:",
                      selectedRequest.actionAfterExpiration,
                    )}

                  {selectedRequest.quotaValue &&
                    selectedRequest.requestType === "newprogrammedsaving" &&
                    renderItem(
                      "Valor de la cuota:",
                      selectedRequest.quotaValue,
                    )}

                  {selectedRequest.requestType === "newprogrammedsaving" &&
                    selectedRequest.deadline &&
                    renderItem("Numero de cuotas:", selectedRequest.deadline)}

                  {selectedRequest.beneficiary &&
                    renderItem("Beneficiario:", selectedRequest.beneficiary)}

                  {selectedRequest.destination &&
                    renderItem("Destino:", selectedRequest.destination)}

                  {selectedRequest.trackingCode &&
                    renderItem(
                      "Código de seguimiento:",
                      selectedRequest.trackingCode,
                    )}

                  {renderItem(
                    "Fecha de solicitud:",
                    formatPrimaryTimestamp(selectedRequest.requestDate, true),
                  )}

                  {selectedRequest.requestType === "aid" &&
                    renderItem("Valor de la solicitud:", selectedRequest.label)}

                  {selectedRequest.requestType === "newcdat" &&
                    selectedRequest.value &&
                    renderItem(
                      "Valor de la inversión:",
                      currencyFormat(selectedRequest.value),
                    )}
                </Grid>
              </Accordion>

              {selectedRequest.requestType === "credit" && (
                <Accordion title="Condiciones del crédito">
                  <Grid
                    autoRows="auto"
                    templateColumns={`repeat(${isMobile ? 1 : 2}, 1fr)`}
                    gap={inube.spacing.s200}
                    width="100%"
                  >
                    {renderItem(
                      "Cuota:",
                      `${selectedRequest.quotaValue} / ${selectedRequest.periodicity}`,
                    )}
                    {renderItem("Plazo:", `${selectedRequest.deadline} Meses`)}
                    {renderItem(
                      "Tasa de interés:",
                      `${selectedRequest.interestRate?.toFixed(2)} % N.A.M.V`,
                    )}
                    {renderItem(
                      "Desembolso aproximado:",
                      currencyFormat(selectedRequest.netValue || 0),
                    )}
                  </Grid>
                </Accordion>
              )}

              {selectedRequest.requestType === "aid" && (
                <Accordion title="Detalles de la situación">
                  <StyledTextGrayContainer>
                    <Text type="body" size="medium" appearance="gray">
                      {selectedRequest.detailsSituation}
                    </Text>
                  </StyledTextGrayContainer>
                </Accordion>
              )}

              {(selectedRequest.requestType === "newprogrammedsaving" ||
                selectedRequest.requestType === "newcdat") && (
                <Accordion title="Forma de pago">
                  <Grid
                    autoRows="auto"
                    templateColumns={`repeat(${isMobile ? 1 : 2}, 1fr)`}
                    gap={inube.spacing.s200}
                    width="100%"
                  >
                    {renderItem(
                      "Medio de pago:",
                      selectedRequest.paymentMethodName,
                    )}
                  </Grid>
                </Accordion>
              )}

              {(selectedRequest.requestType === "newprogrammedsaving" ||
                selectedRequest.requestType === "newcdat") && (
                <Accordion title="Reembolso">
                  <Grid
                    autoRows="auto"
                    templateColumns={`repeat(${isMobile ? 1 : 2}, 1fr)`}
                    gap={inube.spacing.s200}
                    width="100%"
                  >
                    {renderItem(
                      "Forma de reembolso:",
                      selectedRequest.disbursementMethodName,
                    )}

                    {renderItem("Cuenta:", selectedRequest.disbursementAccount)}
                  </Grid>
                </Accordion>
              )}

              {["credit", "aid", "newprogrammedsaving", "newcdat"].includes(
                selectedRequest.requestType,
              ) && (
                <Accordion title="Validaciones del sistema">
                  {requiredValidations?.length === 0 ||
                  requiredValidations?.every(
                    (validation) => validation.value !== "fail",
                  ) ? (
                    <Message
                      appearance="success"
                      title="Has cumplido con todas las validaciones."
                      fullwidth
                    />
                  ) : failValidations && failValidations?.length > 0 ? (
                    <Grid
                      autoRows="auto"
                      templateColumns={`repeat(${isMobile ? 1 : 2}, 1fr)`}
                      gap={inube.spacing.s200}
                      width="100%"
                    >
                      {failValidations?.map((validation) => (
                        <ValidationCard
                          key={validation.id}
                          id={validation.id}
                          label={validation.label}
                          failDetails={validation.failDetails}
                          required={validation.required}
                          pending={validation.pending}
                          value={validation.value}
                        />
                      ))}
                    </Grid>
                  ) : pendingValidations && pendingValidations?.length > 0 ? (
                    <Grid
                      autoRows="auto"
                      templateColumns={`repeat(${isMobile ? 1 : 2}, 1fr)`}
                      gap={inube.spacing.s200}
                      width="100%"
                    >
                      {pendingValidations?.map((validation) => (
                        <ValidationCard
                          key={validation.id}
                          id={validation.id}
                          label={validation.label}
                          failDetails={validation.failDetails}
                          required={validation.required}
                          pending={validation.pending}
                          value={validation.value}
                        />
                      ))}
                    </Grid>
                  ) : null}
                </Accordion>
              )}

              {selectedRequest.requestType === "updatedata" && (
                <>
                  {Object.values(selectedRequest.contactData || {}).some(
                    (value) => value && value !== "",
                  ) && (
                    <Accordion title="Datos de contacto">
                      <Grid
                        autoRows="auto"
                        templateColumns={`repeat(${isMobile ? 1 : 2}, 1fr)`}
                        gap={inube.spacing.s200}
                        width="100%"
                      >
                        {selectedRequest.contactData?.countryName &&
                          renderItem(
                            "País:",
                            selectedRequest.contactData?.countryName,
                          )}

                        {selectedRequest.contactData?.departmentName &&
                          renderItem(
                            "Estado / Departamento:",
                            selectedRequest.contactData?.departmentName,
                          )}
                        {selectedRequest.contactData?.cityName &&
                          renderItem(
                            "Ciudad:",
                            selectedRequest.contactData?.cityName,
                          )}

                        {selectedRequest.contactData?.address &&
                          renderItem(
                            "Dirección:",
                            selectedRequest.contactData?.address,
                          )}

                        {selectedRequest.contactData?.zipCode &&
                          renderItem(
                            "Código postal:",
                            selectedRequest.contactData?.zipCode,
                          )}

                        {selectedRequest.contactData?.landlinePhone &&
                          renderItem(
                            "Teléfono fijo:",
                            selectedRequest.contactData?.landlinePhone,
                          )}

                        {selectedRequest.contactData?.cellPhone &&
                          renderItem(
                            "Teléfono celular:",
                            selectedRequest.contactData?.cellPhone,
                          )}

                        {selectedRequest.contactData?.email &&
                          renderItem(
                            "Correo electrónico:",
                            selectedRequest.contactData?.email,
                          )}
                      </Grid>
                    </Accordion>
                  )}

                  {Object.values(selectedRequest.bankTransfers || {}).some(
                    (value) => value && value !== "",
                  ) && (
                    <Accordion title="Transferencias bancarias">
                      <Grid
                        autoRows="auto"
                        templateColumns={`repeat(${isMobile ? 1 : 2}, 1fr)`}
                        gap={inube.spacing.s200}
                        width="100%"
                      >
                        {selectedRequest.bankTransfers?.bankEntityName &&
                          renderItem(
                            "Entidad bancaria:",
                            selectedRequest.bankTransfers?.bankEntityName,
                          )}

                        {selectedRequest.bankTransfers?.accountType &&
                          renderItem(
                            "Tipo de cuenta:",
                            selectedRequest.bankTransfers?.accountType,
                          )}
                        {selectedRequest.accountNumber &&
                          renderItem(
                            "Numero de cuenta:",
                            selectedRequest.accountNumber,
                          )}
                      </Grid>
                    </Accordion>
                  )}

                  {Object.values(
                    selectedRequest.financialOperations || {},
                  ).some((value) => value && value !== "") && (
                    <Accordion title="Operaciones financieras">
                      <Grid
                        autoRows="auto"
                        templateColumns={`repeat(${isMobile ? 1 : 2}, 1fr)`}
                        gap={inube.spacing.s200}
                        width="100%"
                      >
                        {selectedRequest.financialOperations
                          ?.operationInOutside &&
                          renderItem(
                            "Operaciones en moneda extranjera:",
                            activeDM.valueOf(
                              selectedRequest.financialOperations
                                ?.operationInOutside,
                            )?.value,
                          )}
                        {selectedRequest.financialOperations
                          ?.externalAccounts &&
                          renderItem(
                            "Cuentas en moneda extranjera:",
                            activeDM.valueOf(
                              selectedRequest.financialOperations
                                ?.externalAccounts,
                            )?.value,
                          )}
                        {selectedRequest.financialOperations
                          ?.descriptionOutsideOperation &&
                          renderItem(
                            "Descripción de las operaciones:",
                            selectedRequest.financialOperations
                              ?.descriptionOutsideOperation,
                          )}
                        {selectedRequest.financialOperations
                          ?.externalAccountCountry &&
                          renderItem(
                            "País:",
                            serviceDomains.valueOf(
                              selectedRequest.financialOperations
                                ?.externalAccountCountry,
                              "countries",
                            )?.label,
                          )}
                        {selectedRequest.financialOperations
                          ?.externalAccountBank &&
                          renderItem(
                            "Entidad bancaria:",
                            selectedRequest.financialOperations
                              ?.externalAccountBank,
                          )}
                        {selectedRequest.financialOperations
                          ?.externalCurrencyAccount &&
                          renderItem(
                            "Moneda:",
                            selectedRequest.financialOperations
                              ?.externalCurrencyAccount,
                          )}
                        {selectedRequest.financialOperations
                          ?.externalNumberAccount &&
                          renderItem(
                            "Numero de cuenta:",
                            selectedRequest.financialOperations
                              ?.externalNumberAccount,
                          )}
                      </Grid>
                    </Accordion>
                  )}
                </>
              )}

              {(selectedRequest?.documentaryRequirements?.length || 0) > 0 && (
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
                      {selectedRequest.documentaryRequirements?.map(
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
              )}
            </Stack>

            {isDesktop && <RequestNews news={news} />}
          </Grid>
        )}

        {!isDesktop && selectedTab === requestTabs.news.id && (
          <RequestNews news={news} />
        )}
      </Stack>

      {attachModal.show && (
        <AttachDocumentModal
          portalId="modals"
          maxFileSize={maxFileSize}
          documentType={attachModal.documentType}
          requirementId={attachModal.requirementId}
          onSelectDocuments={onSelectDocument}
          onCloseModal={onCloseAttachModal}
        />
      )}
    </>
  );
}

export { RequestDetailUI };
