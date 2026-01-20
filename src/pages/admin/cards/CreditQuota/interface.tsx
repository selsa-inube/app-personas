import { Box } from "@components/cards/Box";
import { BoxAttribute } from "@components/cards/BoxAttribute";
import { QuickAccess } from "@components/cards/QuickAccess";
import { QuotaDetailBox } from "@components/cards/cards/QuotaDetailBox";
import { UsedQuotaModal } from "@components/modals/cards/UsedQuotaModal";
import { Title } from "@design/data/Title";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { IOption, Message, Select } from "@inubekit/inubekit";
import {
  MdArrowBack,
  MdOpenInNew,
  MdOutlineAdd,
  MdOutlineAttachMoney,
} from "react-icons/md";
import { currencyFormat } from "src/utils/currency";
import { crumbsCreditQuota } from "./config/navigation";
import {
  extractNextPaymentValueDetailsAttrs,
  extractQuotaAttrs,
  extractQuotaTotalDetailsAttrs,
  formatQuotaCurrencyAttrs,
} from "./config/product";
import { ISelectedProductState, IUsedQuotaModalState } from "./types";

import { CurrentConsumption } from "@components/cards/cards/CurrentConsumption";
import { ActionsModal } from "@components/modals/saving/ActionsModal";
import { Breadcrumbs, Button, Grid, Stack, Text } from "@inubekit/inubekit";
import { useContext } from "react";
import { AppContext } from "src/context/app";
import { IProduct } from "src/model/entity/product";
import { useQuickLinks } from "@hooks/useQuickLinks";

interface CreditQuotaUIProps {
  cardId?: string;
  creditQuotaId?: string;
  productsOptions?: IOption[];
  selectedProduct: ISelectedProductState;
  selectedConsumption?: IProduct[];
  usedQuotaModal: IUsedQuotaModalState;
  showActionsModal: boolean;
  handleToggleUsedQuotaModal: () => void;
  handleChangeProduct: (name: string, value: string) => void;
  onToggleActionsModal: () => void;
  onShareCertificate: () => void;
  onDownloadExtract: () => void;
}

function CreditQuotaUI(props: CreditQuotaUIProps) {
  const {
    cardId,
    creditQuotaId,
    selectedProduct,
    selectedConsumption,
    productsOptions,
    usedQuotaModal,
    showActionsModal,
    handleToggleUsedQuotaModal,
    handleChangeProduct,
    onToggleActionsModal,
    onShareCertificate,
    onDownloadExtract,
  } = props;

  const { getFlag } = useContext(AppContext);
  const quickLinksArray = useQuickLinks();
  const isDesktop = useMediaQuery("(min-width: 1400px)");
  const isTablet = useMediaQuery("(max-width: 1030px)");
  const isMobile = useMediaQuery("(max-width: 600px)");

  const attributes =
    selectedProduct && extractQuotaAttrs(selectedProduct.creditQuotaDetail);

  const formatedAttributes = formatQuotaCurrencyAttrs(attributes);

  const minPayment = selectedProduct.creditQuotaDetail.attributes.find(
    (attr) => attr.id === "next_payment_value",
  )?.value;

  const totalPayment = selectedProduct.creditQuotaDetail.attributes.find(
    (attr) => attr.id === "total_payment",
  )?.value;

  const creditQuotaType = selectedProduct.creditQuotaDetail.attributes.find(
    (attr) => attr.id === "type",
  )?.value;

  const withDownloadExtractCardsOption = getFlag(
    "admin.cards.cards-details.download-extract",
  ).value;

  const withShareExtractCardsOption = getFlag(
    "admin.cards.cards-details.share-extract",
  ).value;

  return (
    <>
      <Stack direction="column" gap={inube.spacing.s300}>
        <Breadcrumbs crumbs={crumbsCreditQuota(cardId, creditQuotaId)} />
        <Title
          title="Detalles de cupo"
          subtitle="Detalle del cupo de crédito"
          icon={<MdArrowBack />}
          navigatePage={`/my-cards/${cardId}`}
        />
      </Stack>

      <Grid
        gap={inube.spacing.s600}
        templateColumns={isDesktop ? "1fr 250px" : "1fr"}
        margin={
          isDesktop ? `${inube.spacing.s600} 0 0` : `${inube.spacing.s300} 0 0`
        }
      >
        <Stack direction="column" gap={inube.spacing.s400}>
          <Stack direction="column" gap={inube.spacing.s300}>
            <Select
              id="quotas"
              name="quotas"
              onChange={handleChangeProduct}
              label="Selección de producto"
              options={productsOptions || []}
              value={selectedProduct.creditQuotaDetail.id}
              fullwidth
              disabled={productsOptions && productsOptions.length === 1}
            />

            <Box
              title={selectedProduct.creditQuotaDetail.title}
              subtitle={selectedProduct.creditQuotaDetail.description}
              tags={selectedProduct.creditQuotaDetail.tags}
              icon={<MdOutlineAttachMoney size={34} />}
              collapsing={{ start: true, allow: false }}
            >
              <Grid
                templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
                gap={inube.spacing.s100}
                autoRows="auto"
              >
                {formatedAttributes.slice(0, 1).map((quotaDetail) => (
                  <BoxAttribute
                    key={quotaDetail.id}
                    label={quotaDetail.label}
                    value={quotaDetail.value}
                  />
                ))}
                {usedQuotaModal.data && (
                  <BoxAttribute
                    label="Cupo usado:"
                    buttonIcon={<MdOpenInNew />}
                    buttonValue={currencyFormat(
                      usedQuotaModal.data.usedQuotaValue,
                    )}
                    onClickButton={handleToggleUsedQuotaModal}
                    withButton
                  />
                )}

                {formatedAttributes.slice(1).map((quotaDetail) => (
                  <BoxAttribute
                    key={quotaDetail.id}
                    label={quotaDetail.label}
                    value={quotaDetail.value}
                  />
                ))}
              </Grid>
              {(withDownloadExtractCardsOption ||
                withShareExtractCardsOption) && (
                <Stack justifyContent="flex-end" width="100%">
                  <Button
                    iconBefore={<MdOutlineAdd />}
                    spacing="compact"
                    onClick={onToggleActionsModal}
                  >
                    Acciones
                  </Button>
                </Stack>
              )}
            </Box>
          </Stack>

          {!isNaN(Number(minPayment)) && !isNaN(Number(totalPayment)) && (
            <Stack direction="column" gap={inube.spacing.s300}>
              <Text type="title" size="medium">
                Detalles
              </Text>

              <Grid
                templateColumns={`repeat(${isMobile ? 1 : 2}, 1fr)`}
                gap={inube.spacing.s200}
                autoRows="auto"
              >
                {!isNaN(Number(minPayment)) && (
                  <QuotaDetailBox
                    title="Valor próximo pago"
                    paymentItems={extractNextPaymentValueDetailsAttrs(
                      selectedProduct.creditQuotaDetail,
                    )}
                    totalPayment={Number(minPayment)}
                  />
                )}
                {!isNaN(Number(totalPayment)) && (
                  <QuotaDetailBox
                    title="Total"
                    paymentItems={extractQuotaTotalDetailsAttrs(
                      selectedProduct.creditQuotaDetail,
                    )}
                    totalPayment={Number(totalPayment)}
                  />
                )}
              </Grid>
            </Stack>
          )}

          {selectedConsumption &&
          selectedConsumption.length > 0 &&
          creditQuotaType !== "Rotativo" ? (
            <Stack direction="column" gap={inube.spacing.s300}>
              <Text type="title" size="medium">
                Consumos vigentes
              </Text>
              <Stack direction="column" gap={inube.spacing.s300}>
                <CurrentConsumption
                  isTablet={isTablet}
                  consumptions={selectedConsumption}
                  navigateToDetails={`/my-cards/${cardId}/credit-quota/${creditQuotaId}/consumption`}
                />
              </Stack>
            </Stack>
          ) : (
            <Stack direction="column" gap={inube.spacing.s300}>
              <Text type="title" size="medium" weight="bold">
                Consumos vigentes
              </Text>
              <Message
                title="Actualmente no tienes consumos vigentes registrados en tu producto de crédito."
                appearance="help"
              />
            </Stack>
          )}
        </Stack>

        {isDesktop && <QuickAccess links={quickLinksArray} />}
      </Grid>
      {usedQuotaModal.show && usedQuotaModal.data && (
        <UsedQuotaModal
          portalId="modals"
          onCloseModal={handleToggleUsedQuotaModal}
          usedQuotaData={usedQuotaModal.data}
        />
      )}
      {showActionsModal && (
        <ActionsModal
          productType={selectedProduct.creditQuotaDetail.type}
          onCloseModal={onToggleActionsModal}
          onShare={onShareCertificate}
          onDownloadExtract={onDownloadExtract}
        />
      )}
    </>
  );
}

export { CreditQuotaUI };
