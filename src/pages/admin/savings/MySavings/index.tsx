import { Box } from "@components/cards/Box";
import { Product } from "@components/cards/Product";
import { QuickAccess } from "@components/cards/QuickAccess";
import { quickLinks } from "@config/quickLinks";
import { Text } from "@design/data/Text";
import { Title } from "@design/data/Title";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";
import { Breadcrumbs } from "@design/navigation/Breadcrumbs";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { savingsMock } from "@mocks/products/savings/savings.mocks";
import { MdArrowBack, MdOutlineAttachMoney } from "react-icons/md";
import { savingsAccountIcons } from "../SavingsAccount/config/saving";
import { mySavingsBox } from "./config/boxes";
import { crumbsMySavings } from "./config/navigation";
import {
  extractMySavingsAttributes,
  formatMySavingsCurrencyAttrs,
  mySavingsAttributeBreakpoints,
} from "./config/products";

function MySavings() {
  const mquery = useMediaQuery("(min-width: 1400px)");

  return (
    <>
      <Stack direction="column" gap="s300">
        <Breadcrumbs crumbs={crumbsMySavings} />
        <Title
          title="Mis ahorros"
          subtitle="Consulta y solicita tus productos"
          icon={<MdArrowBack />}
          navigatePage="/"
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
          <Text type="title" size="medium">
            Tus productos
          </Text>
          <Box {...mySavingsBox}>
            <Stack direction="column" gap="s075">
              {savingsMock.length === 0 ? (
                <Product empty={true} icon={<MdOutlineAttachMoney />} />
              ) : (
                savingsMock.map((product) => (
                  <Product
                    id={product.id}
                    key={product.id}
                    title={product.title}
                    description={product.description}
                    attributes={formatMySavingsCurrencyAttrs(
                      extractMySavingsAttributes(product)
                    )}
                    breakpoints={mySavingsAttributeBreakpoints}
                    tags={product.tags}
                    icon={savingsAccountIcons[product.type || "CA"]}
                    navigateTo={`/my-savings/account/${product.id}`}
                  />
                ))
              )}
            </Stack>
          </Box>
        </Stack>
        {mquery && <QuickAccess links={quickLinks} />}
      </Grid>
    </>
  );
}

export { MySavings };
