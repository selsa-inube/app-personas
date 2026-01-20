import { CollapseCard } from "@components/cards/CollapseCard";
import { BoxAttribute } from "@components/cards/BoxAttribute";
import { QuickAccess } from "@components/cards/QuickAccess";
import { Table } from "@design/data/Table";
import { Title } from "@design/data/Title";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { IOption, Select } from "@inubekit/inubekit";
import { MdArrowBack } from "react-icons/md";

import { Breadcrumbs, Grid, Stack, Text } from "@inubekit/inubekit";
import { consumptionBox } from "./config/consumption";
import { crumbsConsumption } from "./config/navigation";
import {
  extractConsumptionAttributes,
  formatConsumptionCurrencyAttrs,
} from "./config/product";
import {
  consumptionMovementsNormalizeEntries,
  consumptionMovementsTableActions,
  movementsTableBreakpoints,
  movementsTableTitles,
} from "./config/table";
import { ISelectedProductState } from "./types";
import { useQuickLinks } from "@hooks/useQuickLinks";

interface ConsumptionUIProps {
  isMobile?: boolean;
  selectedProduct?: ISelectedProductState;
  loading: boolean;
  productsOptions: IOption[];
  cardId?: string;
  creditQuotaId?: string;
  consumptionId?: string;
  handleChangeProduct: (name: string, value: string) => void;
}

function ConsumptionUI(props: ConsumptionUIProps) {
  const {
    isMobile,
    selectedProduct,
    loading,
    productsOptions,
    cardId,
    creditQuotaId,
    consumptionId,
    handleChangeProduct,
  } = props;
  const quickLinksArray = useQuickLinks();

  const attributes =
    selectedProduct &&
    extractConsumptionAttributes(selectedProduct.consumption);

  const isDesktop = useMediaQuery("(min-width: 1400px)");

  const formatedAttributes =
    attributes && formatConsumptionCurrencyAttrs(attributes);

  return (
    <>
      <Stack direction="column" gap={inube.spacing.s300}>
        <Breadcrumbs
          crumbs={crumbsConsumption(cardId, creditQuotaId, consumptionId)}
        />
        <Title
          title="Consulta de consumos"
          subtitle="Información detallada de tus consumos"
          icon={<MdArrowBack />}
          navigatePage={`/my-cards/${cardId}/credit-quota/${creditQuotaId}`}
        />
      </Stack>

      <Grid
        gap={inube.spacing.s600}
        margin={
          isDesktop ? `${inube.spacing.s600} 0 0` : `${inube.spacing.s300} 0 0`
        }
        templateColumns={isDesktop ? "1fr 250px" : "1fr"}
      >
        <Stack direction="column" gap={inube.spacing.s300}>
          {selectedProduct && formatedAttributes && (
            <>
              <Select
                id="consumptionProducts"
                name="consumptionProducts"
                onChange={handleChangeProduct}
                label="Selección de consumo"
                options={productsOptions}
                value={selectedProduct.option}
                disabled={productsOptions.length === 1}
                fullwidth
              />
              <CollapseCard
                title={selectedProduct.consumption.title}
                subtitle={selectedProduct.consumption.description}
                tags={selectedProduct.consumption.tags}
                {...consumptionBox}
              >
                <Stack direction="column" gap={inube.spacing.s100}>
                  <Grid
                    templateColumns={`repeat(${isMobile ? 1 : 2}, 1fr)`}
                    gap={inube.spacing.s100}
                    autoRows="auto"
                  >
                    {formatedAttributes.map((attr) => (
                      <BoxAttribute
                        key={attr.id}
                        label={`${attr.label}: `}
                        value={attr.value}
                      />
                    ))}
                  </Grid>
                </Stack>
              </CollapseCard>
            </>
          )}

          {selectedProduct && selectedProduct.consumption.movements && (
            <Stack
              direction="column"
              gap={inube.spacing.s200}
              alignItems="flex-start"
            >
              <Text type="title" size="medium">
                Últimos movimientos
              </Text>
              <Table
                portalId="modals"
                titles={movementsTableTitles}
                breakpoints={movementsTableBreakpoints}
                actions={consumptionMovementsTableActions}
                entries={consumptionMovementsNormalizeEntries(
                  selectedProduct.consumption.movements || [],
                )}
                loading={loading}
                pageLength={selectedProduct.consumption.movements?.length || 0}
                hideMobileResume
              />
            </Stack>
          )}
        </Stack>
        {isDesktop && <QuickAccess links={quickLinksArray} />}
      </Grid>
    </>
  );
}

export { ConsumptionUI };
