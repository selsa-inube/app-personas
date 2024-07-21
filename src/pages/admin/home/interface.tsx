import { Text } from "@design/data/Text";
import { Stack } from "@design/layout/Stack";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { capitalizeEachWord } from "src/utils/texts";

import { Box } from "@components/cards/Box";
import { QuickAccess } from "@components/cards/QuickAccess";

import { quickLinks } from "@config/quickLinks";

import { inube } from "@design/tokens";
import { StyledCommitmentsContainer } from "./styles";

import { Product } from "@components/cards/Product";
import { Title } from "@design/data/Title";
import { useContext, useEffect, useState } from "react";
import {
  MdOutlineAccountBalanceWallet,
  MdOutlineAttachMoney,
  MdOutlineCreditCard,
} from "react-icons/md";
import { ICommitment, IProduct } from "src/model/entity/product";
import { formatTraceabilityDate } from "src/utils/dates";

import { AppContext } from "src/context/app";
import {
  investmentIcons,
  savingsAccountIcons,
} from "../savings/SavingsAccount/config/saving";
import { ProductsCommitments } from "./ProductsCommitments";
import { cardsBox, creditsBox, savingsBox } from "./config/boxes";
import {
  cardAttributeBreakpoints,
  creditAttributeBreakpoints,
  extractCardAttributes,
  extractCreditAttributes,
  extractInvestmentAttributes,
  extractSavingsAttributes,
  formatCreditCurrencyAttrs,
  formatInvestmentCurrencyAttrs,
  formatSavingsCurrencyAttrs,
  investmentAttributeBreakpoints,
  savingAttributeBreakpoints,
  sumNetValue,
} from "./config/products";
import { Grid } from "@inubekit/grid";

function renderHomeContent(
  savingsAccounts: IProduct[],
  programmedSavings: IProduct[],
  savingsContributions: IProduct[],
  cdats: IProduct[],
  commitments: ICommitment[],
  credits: IProduct[],
  cards: IProduct[],
  loadingSavings: boolean,
  loadingCredits: boolean,
  loadingCards: boolean,
  isTablet: boolean,
  requestSaving: boolean,
  requestCredit: boolean,
  requestCard: boolean,
) {
  return (
    <Stack direction="column" gap="s300">
      <Text type="title" size="medium">
        Tus productos
      </Text>
      <Box {...savingsBox(requestSaving)}>
        <Stack direction="column">
          {loadingSavings ? (
            <Stack direction="column" gap="s200">
              <Product loading />
              <Product loading />
            </Stack>
          ) : (
            <>
              <Stack direction="column" gap="s200">
                {!loadingSavings &&
                  savingsAccounts &&
                  savingsAccounts.length === 0 &&
                  savingsContributions.length === 0 &&
                  cdats &&
                  cdats.length === 0 &&
                  programmedSavings &&
                  programmedSavings.length === 0 && (
                    <Product
                      empty={true}
                      icon={<MdOutlineAccountBalanceWallet />}
                    />
                  )}
              </Stack>

              <Stack direction="column" gap="s250">
                {savingsAccounts && savingsAccounts.length > 0 && (
                  <Stack direction="column" gap="s200">
                    <Text type="label" size="medium">
                      Cuentas
                    </Text>
                    <Stack direction="column" gap="s100">
                      {savingsAccounts.map((saving) => (
                        <Product
                          key={saving.id}
                          title={saving.title}
                          description={saving.id}
                          attributes={formatSavingsCurrencyAttrs(
                            extractSavingsAttributes(saving),
                          )}
                          tags={saving.tags}
                          icon={savingsAccountIcons[saving.type]}
                          breakpoints={savingAttributeBreakpoints}
                          navigateTo={`/my-savings/account/${saving.id}`}
                        />
                      ))}
                    </Stack>
                  </Stack>
                )}

                {savingsContributions && savingsContributions.length > 0 && (
                  <Stack direction="column" gap="s200">
                    <Text type="label" size="medium">
                      Aportes estatutarios
                    </Text>
                    <Stack direction="column" gap="s100">
                      {savingsContributions.map((saving) => (
                        <Product
                          key={saving.id}
                          title={saving.title}
                          description={saving.id}
                          attributes={formatSavingsCurrencyAttrs(
                            extractSavingsAttributes(saving),
                          )}
                          tags={saving.tags}
                          icon={savingsAccountIcons[saving.type]}
                          breakpoints={savingAttributeBreakpoints}
                          navigateTo={`/my-savings/account/${saving.id}`}
                        />
                      ))}
                    </Stack>
                  </Stack>
                )}

                {cdats && cdats.length > 0 && (
                  <Stack direction="column" gap="s200">
                    <Text type="label" size="medium">
                      CDAT
                    </Text>
                    <Stack direction="column" gap="s100">
                      {cdats.map((investment) => (
                        <Product
                          key={investment.id}
                          title={investment.title}
                          description={investment.id}
                          attributes={formatInvestmentCurrencyAttrs(
                            extractInvestmentAttributes(investment),
                          )}
                          tags={investment.tags}
                          icon={investmentIcons[investment.type]}
                          navigateTo={`/my-savings/account/${investment.id}`}
                          breakpoints={investmentAttributeBreakpoints}
                        />
                      ))}
                    </Stack>
                  </Stack>
                )}

                {programmedSavings && programmedSavings.length > 0 && (
                  <Stack direction="column" gap="s200">
                    <Text type="label" size="medium">
                      Ahorros programados
                    </Text>
                    <Stack direction="column" gap="s100">
                      {programmedSavings.map((investment) => (
                        <Product
                          key={investment.id}
                          title={investment.title}
                          description={investment.id}
                          attributes={formatInvestmentCurrencyAttrs(
                            extractInvestmentAttributes(investment),
                          )}
                          tags={investment.tags}
                          icon={investmentIcons[investment.type]}
                          navigateTo={`/my-savings/account/${investment.id}`}
                          breakpoints={investmentAttributeBreakpoints}
                        />
                      ))}
                    </Stack>
                  </Stack>
                )}

                {((savingsAccounts && savingsAccounts.length > 0) ||
                  (savingsContributions && savingsContributions.length > 0) ||
                  (cdats && cdats.length > 0) ||
                  (programmedSavings && programmedSavings.length > 0)) && (
                  <Stack
                    justifyContent="flex-end"
                    gap="s100"
                    padding={`0 ${inube.spacing.s100} 0`}
                  >
                    <Text type="label" size="large">
                      Total Ahorrado :
                    </Text>
                    <Text type="body" size="medium" appearance="gray">
                      {sumNetValue([
                        ...savingsContributions,
                        ...savingsAccounts,
                        ...cdats,
                        ...programmedSavings,
                      ])}
                    </Text>
                  </Stack>
                )}

                {commitments.length > 0 && (
                  <Stack direction="column" gap="s200">
                    <Text type="label" size="medium">
                      Compromisos
                    </Text>
                    <StyledCommitmentsContainer $isTablet={isTablet}>
                      <ProductsCommitments commitments={commitments} />
                    </StyledCommitmentsContainer>
                  </Stack>
                )}
              </Stack>
            </>
          )}
        </Stack>
      </Box>

      <Box {...creditsBox(requestCredit)}>
        <Stack direction="column" gap="s100">
          {loadingCredits ? (
            <>
              <Product loading />
              <Product loading />
            </>
          ) : (
            <>
              {credits.length === 0 ? (
                <Product empty={true} icon={<MdOutlineAttachMoney />} />
              ) : (
                credits.map((credit) => (
                  <Product
                    key={credit.id}
                    title={credit.title}
                    description={credit.id}
                    attributes={formatCreditCurrencyAttrs(
                      extractCreditAttributes(credit),
                    )}
                    breakpoints={creditAttributeBreakpoints}
                    tags={credit.tags}
                    icon={<MdOutlineAttachMoney />}
                    navigateTo={`/my-credits/${credit.id}`}
                  />
                ))
              )}
            </>
          )}
        </Stack>
      </Box>

      <Box {...cardsBox(requestCard)}>
        <Stack direction="column" gap="s100">
          {loadingCards ? (
            <>
              <Product loading />
              <Product loading />
            </>
          ) : (
            <>
              {cards.length === 0 ? (
                <Product icon={<MdOutlineCreditCard />} empty={true} />
              ) : (
                cards.map((card) => (
                  <Product
                    key={card.id}
                    title={card.title}
                    description={card.description}
                    attributes={extractCardAttributes(card)}
                    tags={card.tags}
                    icon={<MdOutlineCreditCard />}
                    breakpoints={cardAttributeBreakpoints}
                    navigateTo={`/my-cards/${card.id}`}
                  />
                ))
              )}
            </>
          )}
        </Stack>
      </Box>
    </Stack>
  );
}

interface HomeUIProps {
  commitments: ICommitment[];
  savingsAccounts: IProduct[];
  savingsContributions: IProduct[];
  cdats: IProduct[];
  programmedSavings: IProduct[];
  credits: IProduct[];
  cards: IProduct[];
  loadingSavings: boolean;
  loadingCredits: boolean;
  loadingCards: boolean;
  isTablet: boolean;
}

function HomeUI(props: HomeUIProps) {
  const {
    commitments,
    savingsAccounts,
    savingsContributions,
    cdats,
    programmedSavings,
    credits,
    cards,
    loadingSavings,
    loadingCredits,
    loadingCards,
    isTablet,
  } = props;

  const { user } = useContext(AppContext);
  const [currentTime, setCurrentTime] = useState(new Date());
  const { getFlag } = useContext(AppContext);

  const isDesktop = useMediaQuery("(min-width: 1440px)");

  useEffect(() => {
    const currentTimeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(currentTimeInterval);
  }, []);

  const withRequestSaving = getFlag(
    "admin.savings.savings.request-saving",
  ).value;

  const withRequestCredit = getFlag(
    "admin.credits.credits.request-credit",
  ).value;

  const withRequestCard = getFlag("admin.cards.cards.request-card").value;

  return (
    <>
      <Stack direction="column" gap="s200">
        <Stack gap="s100">
          <Text type="label" size="medium" appearance="gray">
            Fecha y hora:
          </Text>
          <Text type="body" size="small" appearance="gray">
            {formatTraceabilityDate(currentTime)}
          </Text>
        </Stack>
        <Title
          title={`Bienvenido(a), ${capitalizeEachWord(user.firstName)}`}
          subtitle="Aquí tienes un resumen de tus productos"
        />
      </Stack>
      {!isDesktop ? (
        <Stack direction="column" margin={`${inube.spacing.s300} 0 0`}>
          {renderHomeContent(
            savingsAccounts,
            programmedSavings,
            savingsContributions,
            cdats,
            commitments,
            credits,
            cards,
            loadingSavings,
            loadingCredits,
            loadingCards,
            isTablet,
            withRequestSaving,
            withRequestCredit,
            withRequestCard,
          )}
        </Stack>
      ) : (
        <Grid
          gap={inube.spacing.s600}
          margin={`${inube.spacing.s600} 0 0`}
          templateColumns="1fr 250px"
        >
          {renderHomeContent(
            savingsAccounts,
            programmedSavings,
            savingsContributions,
            cdats,
            commitments,
            credits,
            cards,
            loadingSavings,
            loadingCredits,
            loadingCards,
            isTablet,
            withRequestSaving,
            withRequestCredit,
            withRequestCard,
          )}
          <QuickAccess links={quickLinks} />
        </Grid>
      )}
    </>
  );
}

export { HomeUI };
