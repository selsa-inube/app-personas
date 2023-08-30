import { useMediaQuery } from "@hooks/useMediaQuery";

import { Text } from "@design/data/Text";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";

import { Box } from "@components/cards/Box";
import { QuickAccess } from "@components/cards/QuickAccess";

import { quickLinks } from "@config/quickLinks";

import { Product } from "@components/cards/Product";
import { Title } from "@design/data/Title";
import { creditsMock } from "@mocks/products/credits/credits.mocks";
import { investmentsMock } from "@mocks/products/investments/investments.mocks";
import {
  MdOutlineAccountBalanceWallet,
  MdOutlineAttachMoney,
  MdOutlineCreditCard,
  MdOutlineRealEstateAgent,
} from "react-icons/md";
import { cards, credits, investments, savings } from "./config/boxes";
import {
  creditAttributeBreakpoints,
  extractCreditAttributes,
  extractInvestmentAttributes,
  formatCreditCurrencyAttrs,
  formatInvestmentCurrencyAttrs,
} from "./config/products";
import { cardProducts, savingsProducts } from "./mocks";

function Home() {
  const mquery = useMediaQuery("(min-width: 1400px)");
  const userId = "1";

  const getInvestmentProducts = () => {
    return investmentsMock.filter(
      (investment) => investment.userOwner === userId
    );
  };

  const investmentProducts = getInvestmentProducts();

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
          {investmentProducts.length > 0 && (
            <Box {...investments}>
              <Stack direction="column" gap="s075">
                {investmentProducts.map((investment) => (
                  <Product
                    id={investment.id}
                    key={investment.id}
                    title={investment.title}
                    description={investment.id}
                    attributes={extractInvestmentAttributes(investment)}
                    tags={investment.tags}
                    icon={<MdOutlineRealEstateAgent />}
                    navigateTo={`/my-investments/${investment.id}`}
                  />
                ))}
              </Stack>
            </Box>
          )}
          <Box {...credits}>
            <Stack direction="column" gap="s075">
              {creditsMock.length === 0 ? (
                <Product empty={true} icon={<MdOutlineAttachMoney />} />
              ) : (
                creditsMock.map((credit) => {
                  const attributes = extractCreditAttributes(credit);
                  return (
                    <Product
                      id={credit.id}
                      key={credit.id}
                      title={credit.title}
                      description={credit.id}
                      attributes={formatCreditCurrencyAttrs(attributes)}
                      breakpoints={creditAttributeBreakpoints}
                      tags={credit.tags}
                      icon={<MdOutlineAttachMoney />}
                      navigateTo={`/my-credits/${credit.id}`}
                    />
                  );
                })
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
