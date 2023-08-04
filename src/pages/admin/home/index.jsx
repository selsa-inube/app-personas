import {
  MdOutlineAccountBalanceWallet,
  MdOutlineAttachMoney,
  MdOutlineCreditCard,
} from "react-icons/md";

import { useMediaQuery } from "@hooks/useMediaQuery";

import { Text } from "@design/data/Text";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";

import { Box } from "@components/cards/Box";
import { Product } from "@components/cards/Product";
import { QuickAccess } from "@components/cards/QuickAccess";

import { quickLinks } from "@config/quickLinks";

import { Title } from "@design/data/Title";
import { cards, credits, savings } from "./config/boxes";
import {
  creditAttributeBreakpoints,
  extractCreditAttributes,
} from "./config/products";
import { cardProducts, creditProducts, savingsProducts } from "./mocks";

function Home() {
  const mquery = useMediaQuery("(min-width: 1400px)");

  return (
    <>
      <Title
        title="Bienvenido, Leonardo"
        subtitle="Aquí tienes un resumen de tus productos "
      />
      <Grid
        gap="s600"
        margin={mquery ? "48px 0 0" : "24px 0 0"}
        templateColumns={mquery ? "1fr 250px" : "1fr"}
      >
        <Stack direction="column" gap="s300">
          <Text type="title" size="medium">
            Tus productos
          </Text>
          <Box {...savings}>
            <Stack direction="column" gap="s075">
              {savingsProducts.length === 0 ? (
                <Product
                  empty={true}
                  icon={<MdOutlineAccountBalanceWallet />}
                />
              ) : (
                savingsProducts.map(({ title, id, attributes, tags }) => (
                  <Product
                    id={id}
                    key={id}
                    title={title}
                    description={id}
                    attributes={attributes}
                    tags={tags}
                    icon={<MdOutlineAccountBalanceWallet />}
                  />
                ))
              )}
            </Stack>
          </Box>
          <Box {...credits}>
            <Stack direction="column" gap="s075">
              {creditProducts.length === 0 ? (
                <Product empty={true} icon={<MdOutlineAttachMoney />} />
              ) : (
                creditProducts.map((credit) => (
                  <Product
                    id={credit.id}
                    key={credit.id}
                    title={credit.title}
                    description={credit.id}
                    attributes={extractCreditAttributes(credit)}
                    breakpoints={creditAttributeBreakpoints}
                    tags={credit.tags}
                    icon={<MdOutlineAttachMoney />}
                  />
                ))
              )}
            </Stack>
          </Box>
          <Box {...cards}>
            <Stack direction="column" gap="s075">
              {cardProducts.length === 0 ? (
                <Product icon={<MdOutlineCreditCard />} empty={true} />
              ) : (
                cardProducts.map(({ title, id, attributes, tags }) => (
                  <Product
                    id={id}
                    key={id}
                    title={title}
                    description={id}
                    attributes={attributes}
                    tags={tags}
                    icon={<MdOutlineCreditCard />}
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

export { Home };
