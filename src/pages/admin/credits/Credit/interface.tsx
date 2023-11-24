import { Box } from "@components/cards/Box";
import { BoxAttribute } from "@components/cards/BoxAttribute";
import { QuickAccess } from "@components/cards/QuickAccess";
import { quickLinks } from "@config/quickLinks";
import { Table } from "@design/data/Table";
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
import {
  MdArrowBack,
  MdOutlineAssignment,
  MdOutlineAssignmentTurnedIn,
} from "react-icons/md";
import { creditMovementsTableActions } from "../CreditMovements/config/table";
import {
  movementsTableBreakpoints,
  movementsTableTitles,
} from "../MyCredits/config/tables";
import { creditBox } from "./config/credit";
import { crumbsCredit } from "./config/navigation";
import {
  extractCreditAttributes,
  formatCreditCurrencyAttrs,
} from "./config/product";
import { StyledMovementsContainer } from "./styles";
import { ISelectedProductState } from "./types";

interface CreditUIProps {
  isMobile?: boolean;
  handleChangeProduct: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedProduct: ISelectedProductState;
  productsOptions: ISelectOption[];
  credit_id?: string;
}

function CreditUI(props: CreditUIProps) {
  const {
    isMobile,
    handleChangeProduct,
    selectedProduct,
    productsOptions,
    credit_id,
  } = props;
  const attributes = extractCreditAttributes(selectedProduct.credit);

  const isDesktop = useMediaQuery("(min-width: 1400px)");

  return (
    <>
      <Stack direction="column" gap="s300">
        <Breadcrumbs crumbs={crumbsCredit(credit_id)} />
        <Title
          title="Consulta de créditos"
          subtitle="Información detallada de tus productos de crédito"
          icon={<MdArrowBack />}
          navigatePage="/my-credits"
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
          <Select
            id="creditProducts"
            handleChange={handleChangeProduct}
            label="Selección de producto"
            options={productsOptions}
            value={selectedProduct.option}
            isFullWidth
          />
          <Box
            title={selectedProduct.credit.title}
            subtitle={selectedProduct.credit.id}
            tags={selectedProduct.credit.tags}
            button={{
              label: "Plan de pagos",
              icon: <MdOutlineAssignment />,
              path: `/my-credits/${credit_id}/credit-amortization`,
            }}
            {...creditBox}
          >
            <Stack direction="column" gap="s100">
              <Grid templateColumns={isMobile ? "1fr" : "1fr 1fr"} gap="s100">
                {formatCreditCurrencyAttrs(attributes).map((attr) => (
                  <BoxAttribute
                    key={attr.id}
                    label={`${attr.label}: `}
                    value={attr.value}
                  />
                ))}
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
                actions={creditMovementsTableActions}
                entries={selectedProduct.credit.movements || []}
                pageLength={selectedProduct.credit.movements?.length || 0}
                hideMobileResume
              />
              <Button
                type="link"
                appearance="dark"
                variant="none"
                iconBefore={<MdOutlineAssignmentTurnedIn />}
                path={`/my-credits/${credit_id}/credit-movements`}
              >
                Movimientos
              </Button>
            </StyledMovementsContainer>
          </Stack>
        </Stack>
        {isDesktop && <QuickAccess links={quickLinks} />}
      </Grid>
    </>
  );
}

export { CreditUI };
