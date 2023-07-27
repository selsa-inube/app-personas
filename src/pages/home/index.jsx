import {
  MdOutlineAccountBalanceWallet,
  MdOutlineAttachMoney,
  MdOutlineCreditCard,
} from "react-icons/md";

import { useMediaQuery } from "@hooks/useMediaQuery";

import { Text } from "../../design/data/Text";
import { Stack } from "../../design/layout/Stack";
import { Grid } from "../../design/layout/Grid";
import { inube } from "../../design/tokens";

import { Box } from "../../components/cards/Box";
import { Product } from "../../components/cards/Product";
import { QuickAccess } from "../../components/cards/QuickAccess";

import { quickLinks } from "../../config/quickLinks";
import { savings, credits, cards } from "./config/boxes";
import {
  creditAttributeBreakpoints,
  extractCreditAttributes,
} from "./config/products";

import { savingsProducts, creditProducts, cardProducts } from "./mocks";

function Home() {
  const mquery = useMediaQuery("(min-width: 1400px)");

  return (
    <>
      <Stack gap="4px" direction="column">
        <Text type="title" as="h1">
          Bienvenido, Leonardo
        </Text>
        <Text type="body" size="medium" appearance="gray">
          Aquí tienes un resumen de tus productos
        </Text>
      </Stack>
      <Grid
        gap={inube.spacing.s600}
        margin={`${inube.spacing.s600} 0 0`}
        templateColumns={mquery ? "1fr 250px" : "1fr"}
      >
        <Stack direction="column" gap={inube.spacing.s300}>
          <Text type="label">Tus productos</Text>
          <Box {...savings}>
            <Stack direction="column" gap={inube.spacing.s075}>
              {savingsProducts.length === 0 ? (
                <Product
                  empty={true}
                  icon={<MdOutlineAccountBalanceWallet />}
                />
              ) : (
                savingsProducts.map(({ title, id, attributes, tags }) => (
                  <Product
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
            <Stack direction="column" gap={inube.spacing.s075}>
              {creditProducts.length === 0 ? (
                <Product empty={true} icon={<MdOutlineAttachMoney />} />
              ) : (
                creditProducts.map((credit) => (
                  <Product
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
            <Stack direction="column" gap={inube.spacing.s075}>
              {cardProducts.length === 0 ? (
                <Product icon={<MdOutlineCreditCard />} empty={true} />
              ) : (
                cardProducts.map(({ title, id, attributes, tags }) => (
                  <Product
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
