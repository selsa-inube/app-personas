import { useMediaQuery } from "@hooks/useMediaQuery";

import { Text } from "@design/data/Text";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";

import { Box } from "@components/cards/Box";
import { QuickAccess } from "@components/cards/QuickAccess";

import { quickLinks } from "@config/quickLinks";

import { Product } from "@components/cards/Product";
import { SavingsCommitmentCard } from "@components/cards/SavingsCommitmentCard";
import { Title } from "@design/data/Title";
import { creditsMock } from "@mocks/products/credits/credits.mocks";
import { investmentsMock } from "@mocks/products/investments/investments.mocks";
import { savingsMock } from "@mocks/products/savings/savings.mocks";
import { savingsCommitmentsMock } from "@mocks/products/savings/savingsCommitments.mocks";
import {
  MdOutlineAccountBalanceWallet,
  MdOutlineAttachMoney,
  MdOutlineCreditCard,
} from "react-icons/md";
import { USER_ID } from "src/App";
import { truncateAndObfuscateDescription } from "src/utils/formats";
import { extractAttribute } from "src/utils/products";
import { investmentIcons } from "../investments/Investment/config/investment";
import { savingsAccountIcons } from "../savings/SavingsAccount/config/saving";
import { investmentsCommitmentsMock } from "@mocks/products/investments/investmentsCommitments.mocks";
import { cards, credits, savings } from "./config/boxes";
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
import { useNavigate } from "react-router-dom";

const renderProductsCommitments = () => {
  const productsCommitments = [
    ...savingsCommitmentsMock,
    ...investmentsCommitmentsMock,
  ];
  return productsCommitments.map((commitment) => {
    const valueToPay = extractAttribute(commitment.attributes, "value_to_pay");
    const nextPayDate = extractAttribute(
      commitment.attributes,
      "next_pay_date"
    );
    const navigate = useNavigate();

    const handleNavigateCommitment = () => {
      navigate(`/my-savings/commitment/${commitment.id}`);
    };

    return (
      <SavingsCommitmentCard
        key={commitment.id}
        title={commitment.title}
        label="Ver"
        descriptionLabel={nextPayDate?.label}
        descriptionValue={String(nextPayDate?.value)}
        value={Number(valueToPay?.value)}
        tag={commitment.tag}
        onClick={handleNavigateCommitment}
      />
    );
  });
};

function Home() {
  const mquery = useMediaQuery("(min-width: 1400px)");

  const getSavingProducts = (type: string) => {
    return savingsMock.filter((investment) => investment.type === type);
  };

  const savingsAccountsMock = getSavingProducts("CA");
  const savingsStatutoryContributionsMock = getSavingProducts("AP");

  const getInvestmentsProducts = (type: string) => {
    return investmentsMock.filter(
      (investment) =>
        investment.userOwner === USER_ID && investment.type === type
    );
  };

  const cdats = getInvestmentsProducts("CD");
  const programmedSavings = getInvestmentsProducts("AP");

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
            <Stack direction="column" gap="s250">
              <Stack direction="column" gap="s200">
                {savingsCommitmentsMock.length > 0 && (
                  <Text type="label" size="medium">
                    Cuentas
                  </Text>
                )}
                <Stack direction="column" gap="s100">
                  {savingsAccountsMock.length === 0 ? (
                    <Product
                      empty={true}
                      icon={<MdOutlineAccountBalanceWallet />}
                    />
                  ) : (
                    savingsAccountsMock.map((saving) => (
                      <Product
                        id={saving.id}
                        key={saving.id}
                        title={saving.title}
                        description={truncateAndObfuscateDescription(
                          saving.id,
                          saving.type,
                          4
                        )}
                        attributes={formatSavingCurrencyAttrs(
                          extractSavingAttributes(saving)
                        )}
                        tags={saving.tags}
                        icon={savingsAccountIcons[saving.type]}
                        breakpoints={savingAttributeBreakpoints}
                        navigateTo={`/my-savings/account/${saving.id}`}
                      />
                    ))
                  )}
                </Stack>
              </Stack>
              <Stack direction="column" gap="s200">
                {savingsStatutoryContributionsMock.length > 0 && (
                  <Text type="label" size="medium">
                    Aportes estatutarios
                  </Text>
                )}
                <Stack direction="column" gap="s100">
                  {savingsStatutoryContributionsMock.length === 0 ? (
                    <Product
                      empty={true}
                      icon={<MdOutlineAccountBalanceWallet />}
                    />
                  ) : (
                    savingsStatutoryContributionsMock.map((saving) => (
                      <Product
                        id={saving.id}
                        key={saving.id}
                        title={saving.title}
                        description={truncateAndObfuscateDescription(
                          saving.id,
                          saving.type,
                          4
                        )}
                        attributes={formatSavingCurrencyAttrs(
                          extractSavingAttributes(saving)
                        )}
                        tags={saving.tags}
                        icon={savingsAccountIcons[saving.type]}
                        breakpoints={savingAttributeBreakpoints}
                        navigateTo={`/my-savings/account/${saving.id}`}
                      />
                    ))
                  )}
                </Stack>
              </Stack>
              <Stack direction="column" gap="s200">
                {cdats.length > 0 && (
                  <Text type="label" size="medium">
                    CDAT
                  </Text>
                )}
                <Stack direction="column" gap="s100">
                  {cdats.map((investment) => (
                    <Product
                      id={investment.id}
                      key={investment.id}
                      title={investment.title}
                      description={investment.id}
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
              </Stack>
              <Stack direction="column" gap="s200">
                {programmedSavings.length > 0 && (
                  <Text type="label" size="medium">
                    Ahorros programados
                  </Text>
                )}
                <Stack direction="column" gap="s100">
                  {programmedSavings.map((investment) => (
                    <Product
                      id={investment.id}
                      key={investment.id}
                      title={investment.title}
                      description={investment.id}
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
              </Stack>
              <Stack justifyContent="flex-end" gap="s100">
                <Text type="label" size="large">
                  Total ahorrado :
                </Text>
                <Text type="body" size="medium" appearance="gray">
                  $ 14.734.650
                </Text>
              </Stack>
              {savingsCommitmentsMock.length > 0 && (
                <Text type="label" size="medium">
                  Compromisos
                </Text>
              )}
              <Stack direction="column" gap="s100">
                {renderProductsCommitments()}
              </Stack>
            </Stack>
          </Box>
          <Box {...credits}>
            <Stack direction="column" gap="s100">
              {creditsMock.length === 0 ? (
                <Product empty={true} icon={<MdOutlineAttachMoney />} />
              ) : (
                creditsMock.map((credit) => (
                  <Product
                    id={credit.id}
                    key={credit.id}
                    title={credit.title}
                    description={credit.id}
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
            <Stack direction="column" gap="s100">
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
