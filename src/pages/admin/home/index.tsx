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
import { savingsMock } from "@mocks/products/savings/savings.mocks";
import {
  MdOutlineAccountBalanceWallet,
  MdOutlineAttachMoney,
  MdOutlineCreditCard,
} from "react-icons/md";
import { USER_ID } from "src/App";
import { savingsAccountIcons } from "../savings/SavingsAccount/config/saving";
import { cards, credits, investments, savings } from "./config/boxes";
import {
  creditAttributeBreakpoints,
  extractCreditAttributes,
  extractInvestmentAttributes,
  extractSavingAttributes,
  formatCreditCurrencyAttrs,
  formatInvestmentCurrencyAttrs,
  formatSavingCurrencyAttrs,
  investmentAttributeBreakpoints,
  savingAttributeBreakpoints,
} from "./config/products";
import { cardProducts } from "./mocks";
import { investmentIcons } from "../investments/Investment/config/investment";

function Home() {
  const mquery = useMediaQuery("(min-width: 1400px)");

  const getInvestmentProducts = () => {
    return investmentsMock.filter(
      (investment) => investment.userOwner === USER_ID
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
              {savingsMock.length === 0 ? (
                <Product
                  empty={true}
                  icon={<MdOutlineAccountBalanceWallet />}
                />
              ) : (
                savingsMock.map((saving) => (
                  <Product
                    id={saving.id}
                    key={saving.id}
                    title={saving.title}
                    description={saving.description}
                    attributes={formatSavingCurrencyAttrs(
                      extractSavingAttributes(saving)
                    )}
                    tags={saving.tags}
                    icon={savingsAccountIcons[saving.type || "CA"]}
                    breakpoints={savingAttributeBreakpoints}
                    navigateTo={`/my-savings/account/${saving.id}`}
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
                    description={investment.description}
                    attributes={formatInvestmentCurrencyAttrs(
                      extractInvestmentAttributes(investment)
                    )}
                    tags={investment.tags}
                    icon={investmentIcons[investment.type]}
                    navigateTo={`/my-investments/${investment.id}`}
                    breakpoints={investmentAttributeBreakpoints}
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
                creditsMock.map((credit) => (
                  <Product
                    id={credit.id}
                    key={credit.id}
                    title={credit.title}
                    description={credit.description}
                    attributes={formatCreditCurrencyAttrs(
                      extractCreditAttributes(credit)
                    )}
                    breakpoints={creditAttributeBreakpoints}
                    tags={credit.tags}
                    icon={<MdOutlineAttachMoney />}
                    navigateTo={`/my-credits/${credit.id}`}
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
                cardProducts.map(
                  ({ title, id, attributes, tags, description }) => (
                    <Product
                      id={id}
                      key={id}
                      title={title}
                      description={description}
                      attributes={attributes}
                      tags={tags}
                      icon={<MdOutlineCreditCard />}
                    />
                  )
                )
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
