import { Title } from "@design/data/Title";
import { Stack } from "@design/layout/Stack";
import { Breadcrumbs } from "@design/navigation/Breadcrumbs";
import { MdArrowBack, MdOpenInNew } from "react-icons/md";
import { crumbsCard } from "./config/navigation";
import { Grid } from "@design/layout/Grid";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { inube } from "@design/tokens";
import { QuickAccess } from "@components/cards/QuickAccess";
import { quickLinks } from "@config/quickLinks";
import { ISavingAccountsModal, ISelectedProductState } from "./types";
import { Select } from "@design/input/Select";
import { ISelectOption } from "@design/input/Select/types";
import { Box } from "@components/cards/Box";
import { cardBox } from "./config/card";
import {
  extractCardAttributes,
  formatCardCurrencyAttrs,
} from "./config/product";
import { BoxAttribute } from "@components/cards/BoxAttribute";
import { SavingAccountsModal } from "@components/modals/cards/SavingAccountsModal";

interface CardUIProps {
  cardId?: string;
  selectedProduct: ISelectedProductState;
  savingAccountsModal: ISavingAccountsModal;
  productsOptions: ISelectOption[];
  handleChangeProduct: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleToggleSavingsAccountModal: () => void;
}

function CardUI(props: CardUIProps) {
  const {
    cardId,
    selectedProduct,
    savingAccountsModal,
    productsOptions,
    handleChangeProduct,
    handleToggleSavingsAccountModal,
  } = props;

  const isDesktop = useMediaQuery("(min-width: 1400px)");
  const isMobile = useMediaQuery("(max-width: 700px)");

  const attributes =
    selectedProduct && extractCardAttributes(selectedProduct.card);

  const formatedAttributes = attributes && formatCardCurrencyAttrs(attributes);

  return (
    <>
      <Stack direction="column" gap="s300">
        <Breadcrumbs crumbs={crumbsCard(cardId)} />
        <Title
          title="Consulta de tarjetas"
          subtitle="Información detallada de tus tarjetas"
          icon={<MdArrowBack />}
          navigatePage="/my-cards"
        />
      </Stack>
      <Grid
        gap="s600"
        margin={
          isDesktop ? `${inube.spacing.s600} 0 0` : `${inube.spacing.s300} 0 0`
        }
        templateColumns={isDesktop ? "1fr 250px" : "1fr"}
      >
        <Stack direction="column" gap="s300">
          {selectedProduct && (
            <>
              <Select
                id="cardProducts"
                onChange={handleChangeProduct}
                label="Selección de producto"
                options={productsOptions}
                value={selectedProduct.option}
                isFullWidth
              />
              <Box
                title={selectedProduct.card.title}
                subtitle={selectedProduct.card.id}
                tags={selectedProduct.card.tags}
                {...cardBox}
              >
                <Stack direction="column" gap="s100">
                  <Grid
                    templateColumns={isMobile ? "1fr" : "1fr 1fr"}
                    gap="s100"
                  >
                    {formatedAttributes.slice(0, 4).map((attr) => (
                      <BoxAttribute
                        key={attr.id}
                        label={`${attr.label}: `}
                        value={attr.value}
                      />
                    ))}
                    <BoxAttribute
                      label={`Cuentas de ahorro: `}
                      buttonIcon={<MdOpenInNew />}
                      buttonValue="Ver"
                      onClickButton={handleToggleSavingsAccountModal}
                      withButton
                    />
                  </Grid>
                </Stack>
              </Box>
            </>
          )}
        </Stack>
        {isDesktop && <QuickAccess links={quickLinks} />}
      </Grid>
      {savingAccountsModal.show && (
        <SavingAccountsModal
          portalId="modals"
          savingAccounts={savingAccountsModal.data}
          onCloseModal={handleToggleSavingsAccountModal}
        />
      )}
    </>
  );
}

export { CardUI };
