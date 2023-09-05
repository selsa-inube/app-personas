import { Box } from "@components/cards/Box";
import { BoxAttribute } from "@components/cards/BoxAttribute";
import { QuickAccess } from "@components/cards/QuickAccess";
import { quickLinks } from "@config/quickLinks";
import { Table } from "@design/data/Table";
import { IAction } from "@design/data/Table/types";
import { Text } from "@design/data/Text";
import { Title } from "@design/data/Title";
import { Button } from "@design/input/Button";
import { Select } from "@design/input/Select";
import { ISelectOption } from "@design/input/Select/types";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";
import { Breadcrumbs } from "@design/navigation/Breadcrumbs";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { AttributesModal } from "@components/modals/AttributesModal";
import {
  MdArrowBack,
  MdOutlinePaid,
  MdOutlineAssignmentTurnedIn,
  MdOpenInNew,
} from "react-icons/md";
import {
  movementsTableBreakpoints,
  movementsTableTitles,
} from "@pages/admin/credits/MyCredits/config/tables";
import { savingBox } from "./config/saving";
import { crumbsSaving } from "./config/navigation";
import {
  extractSavingAttributes,
  formatSavingCurrencyAttrs,
} from "./config/product";
import { StyledMovementsContainer } from "./styles";
import { ISelectedProductState, IBeneficiariesModalState } from "./types";

interface SavingsAccountUIProps {
  isMobile?: boolean;
  selectedProduct: ISelectedProductState;
  productsOptions: ISelectOption[];
  beneficiariesModal: IBeneficiariesModalState;
  savingTableActions: IAction[];
  productId?: string;
  handleToggleModal: () => void;
  handleChangeProduct: (option: ISelectOption) => void;
}

function SavingsAccountUI(props: SavingsAccountUIProps) {
  const {
    isMobile,
    selectedProduct,
    productsOptions,
    savingTableActions,
    beneficiariesModal,
    productId,
    handleToggleModal,
    handleChangeProduct,
  } = props;

  const mquery = useMediaQuery("(min-width: 1400px)");

  const attributes = extractSavingAttributes(selectedProduct.saving);

  return (
    <>
      <Stack direction="column" gap="s300">
        <Breadcrumbs crumbs={crumbsSaving(productId)} />
        <Title
          title="Consulta de ahorros"
          subtitle="Información detallada de tus productos de ahorro"
          icon={<MdArrowBack />}
          navigatePage="/my-savings"
        />
      </Stack>

      <Grid
        gap="s600"
        margin={
          mquery ? `${inube.spacing.s600} 0 0` : `${inube.spacing.s300} 0 0`
        }
        templateColumns={mquery ? "1fr 250px" : "1fr"}
      >
        <Stack direction="column" gap="s300">
          <Select
            id="savingProducts"
            handleChange={handleChangeProduct}
            label="Selección de producto"
            options={productsOptions}
            value={selectedProduct?.option}
            isFullWidth
          />
          <Box
            title={selectedProduct.saving.title}
            subtitle={`Cuenta de ahorros - ${selectedProduct.saving.id}`}
            tags={selectedProduct.saving.tags}
            button={{
              label: "Compromisos de ahorro",
              icon: <MdOutlinePaid />,
              path: ``,
            }}
            {...savingBox}
          >
            <Stack direction="column" gap="s100">
              <Grid templateColumns={isMobile ? "1fr" : "1fr 1fr"} gap="s100">
                {formatSavingCurrencyAttrs(attributes).map((attr) => (
                  <BoxAttribute
                    key={attr.id}
                    label={`${attr.label}: `}
                    value={attr.value}
                  />
                ))}
                <BoxAttribute
                  key="beneficiariesAttr"
                  label="Beneficiarios:"
                  buttonIcon={<MdOpenInNew />}
                  buttonValue={beneficiariesModal.data.length}
                  onClickButton={handleToggleModal}
                  withButton
                />
              </Grid>
            </Stack>
          </Box>

          <Stack direction="column" gap="s200" alignItems="flex-start">
            <Text type="title" size="medium">
              Últimos movimientos
            </Text>
            <StyledMovementsContainer>
              <Table
                id="modals"
                titles={movementsTableTitles}
                breakpoints={movementsTableBreakpoints}
                actions={savingTableActions}
                entries={selectedProduct.saving.savingMovements || []}
                pageLength={selectedProduct.saving.savingMovements?.length || 0}
                hideMobileResume
              />
              <Button
                type="link"
                appearance="dark"
                variant="none"
                iconBefore={<MdOutlineAssignmentTurnedIn />}
                path={`/my-savings/account/${productId}/movements`}
              >
                Movimientos
              </Button>
            </StyledMovementsContainer>
          </Stack>
        </Stack>
        {mquery && <QuickAccess links={quickLinks} />}
      </Grid>
      {beneficiariesModal.show && (
        <AttributesModal
          portalId="modals"
          title="Beneficiarios"
          description="Porcentaje de participación"
          onCloseModal={handleToggleModal}
          attributes={beneficiariesModal.data}
        />
      )}
    </>
  );
}

export { SavingsAccountUI };
