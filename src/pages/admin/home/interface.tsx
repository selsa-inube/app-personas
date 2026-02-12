import { capitalizeEachWord } from "src/utils/texts";
import { QuickAccess } from "@components/cards/QuickAccess";
import { inube } from "@design/tokens";
import { Title } from "@design/data/Title";
import { useContext, useEffect, useState } from "react";
import { ICommitment, IProduct } from "src/model/entity/product";
import { formatTraceabilityDate } from "src/utils/dates";
import { Grid, Stack, Text } from "@inubekit/inubekit";
import { AppContext } from "src/context/app";
import { ProductsCommitments } from "./ProductsCommitments";
import { cardsBox, creditsBox, savingsBox, commitmentsBox } from "./config/boxes";
import {
  cardAttributeBreakpoints,
  creditAttributeBreakpoints,
  extractProductAttributes,
  formatProductCurrencyAttrs,
  investmentAttributeBreakpoints,
  extractCardAttributesWithUsedQuota,
  formatCardCurrencyAttrs,
  savingAttributeBreakpoints,
  sumNetValue,
  sumUsedQuota,
  sumCommitmentNextPaymentValue,
  sumCreditValue,
  extractCreditAttributes,
  formatCreditCurrencyAttrs,
} from "./config/products";
import { useQuickLinks } from "@hooks/useQuickLinks";
import { CollapseCard } from "@components/cards/CollapseCard";
import { Product } from "@components/cards/Product";

function renderHomeContent(
  savingsAccounts: IProduct[],
  programmedSavings: IProduct[],
  savingsContributions: IProduct[],
  cdats: IProduct[],
  commitments: ICommitment[],
  credits: IProduct[],
  cards: IProduct[],
  creditQuotas: IProduct[],
  loadingSavings: boolean,
  loadingCredits: boolean,
  loadingCards: boolean,
  withMyCards: boolean,
  isMobile: boolean,
) {
  return (
    <Stack direction="column" gap={inube.spacing.s300}>
      <Stack
        padding={`0 ${inube.spacing.s200}`}
        gap={inube.spacing.s100}
      >
        <Text type="title" size="medium">
          Tus productos
        </Text>
      </Stack>
      <CollapseCard
        {...savingsBox(
          (savingsContributions.length + savingsAccounts.length + cdats.length + programmedSavings.length) > 0,
          sumNetValue([...savingsContributions, ...savingsAccounts, ...cdats, ...programmedSavings]),
          [...savingsContributions, ...savingsAccounts, ...cdats, ...programmedSavings].flatMap(product => product.tags || [])
        )}
      >
        <Stack direction="column">
          {loadingSavings ? (
            <Stack direction="column" gap={inube.spacing.s200}>
              <Product loading />
              <Product loading />
            </Stack>
          ) : (
            <>
              <Stack direction="column" gap={inube.spacing.s200}>
                {
                  !loadingSavings &&
                  savingsAccounts &&
                  savingsAccounts.length === 0 &&
                  savingsContributions.length === 0 &&
                  cdats &&
                  cdats.length === 0 &&
                  programmedSavings &&
                  programmedSavings.length === 0 && (<Product empty />)
                }
              </Stack>

              <Stack direction="column" gap={inube.spacing.s300}>
                {savingsAccounts && savingsAccounts.length > 0 && (
                  <Stack direction="column" gap={inube.spacing.s150}>
                    <Text
                      type="title"
                      size="small"
                      appearance="gray"
                      weight="bold"
                      padding={`0 ${inube.spacing.s100}`}
                    >
                      Cuentas
                    </Text>
                    <Stack direction="column" gap={inube.spacing.s150}>
                      {savingsAccounts.map((saving) => (
                        <Product
                          type="compact"
                          key={saving.id}
                          title={saving.title}
                          description={saving.id}
                          attributes={formatProductCurrencyAttrs(extractProductAttributes(saving))}
                          tags={saving.tags}
                          breakpoints={savingAttributeBreakpoints}
                          navigateTo={`/my-savings/account/${saving.id}`}
                        />
                      ))}
                    </Stack>
                  </Stack>
                )}

                {savingsContributions && savingsContributions.length > 0 && (
                  <Stack direction="column" gap={inube.spacing.s150}>
                    <Text
                      type="title"
                      size="small"
                      appearance="gray"
                      weight="bold"
                      padding={`0 ${inube.spacing.s100}`}
                    >
                      Aportes estatutarios
                    </Text>
                    <Stack direction="column" gap={inube.spacing.s150}>
                      {savingsContributions.map((saving) => (
                        <Product
                          type="compact"
                          key={saving.id}
                          title={saving.title}
                          description={saving.id}
                          attributes={formatProductCurrencyAttrs(extractProductAttributes(saving))}
                          tags={saving.tags}
                          breakpoints={savingAttributeBreakpoints}
                          navigateTo={`/my-savings/account/${saving.id}`}
                        />
                      ))}
                    </Stack>
                  </Stack>
                )}

                {cdats && cdats.length > 0 && (
                  <Stack direction="column" gap={inube.spacing.s150}>
                    <Text
                      type="title"
                      size="small"
                      appearance="gray"
                      weight="bold"
                      padding={`0 ${inube.spacing.s100}`}
                    >
                      CDAT
                    </Text>
                    <Stack direction="column" gap={inube.spacing.s150}>
                      {cdats.map((investment) => (
                        <Product
                          type="compact"
                          key={investment.id}
                          title={investment.title}
                          description={investment.id}
                          attributes={formatProductCurrencyAttrs(extractProductAttributes(investment))}
                          tags={investment.tags}
                          navigateTo={`/my-savings/account/${investment.id}`}
                          breakpoints={investmentAttributeBreakpoints}
                        />
                      ))}
                    </Stack>
                  </Stack>
                )}

                {programmedSavings && programmedSavings.length > 0 && (
                  <Stack direction="column" gap={inube.spacing.s150}>
                    <Text
                      type="title"
                      size="small"
                      appearance="gray"
                      weight="bold"
                      padding={`0 ${inube.spacing.s100}`}
                    >
                      Ahorros programados
                    </Text>
                    <Stack direction="column" gap={inube.spacing.s150}>
                      {programmedSavings.map((investment) => (
                        <Product
                          type="compact"
                          key={investment.id}
                          title={investment.title}
                          description={investment.id}
                          attributes={formatProductCurrencyAttrs(extractProductAttributes(investment))}
                          tags={investment.tags}
                          navigateTo={`/my-savings/account/${investment.id}`}
                          breakpoints={investmentAttributeBreakpoints}
                        />
                      ))}
                    </Stack>
                  </Stack>
                )}
              </Stack>
            </>
          )}
        </Stack>
      </CollapseCard>

      <CollapseCard
        {...creditsBox(
          credits.length > 0,
          sumCreditValue([...credits]),
          credits.flatMap(credit => credit.tags || [])
        )}
      >
        <Stack direction="column" gap={inube.spacing.s100}>
          {loadingCredits ? (
            <>
              <Product loading />
              <Product loading />
            </>
          ) : (
            <>
              {credits.length === 0 ? (
                <Product empty />
              ) : (
                credits.map((credit) => (
                  <Product
                    type="compact"
                    key={credit.id}
                    title={credit.title}
                    description={credit.id}
                    attributes={formatCreditCurrencyAttrs(extractCreditAttributes(credit, true))}
                    breakpoints={creditAttributeBreakpoints}
                    tags={credit.tags}
                    navigateTo={`/my-credits/${credit.id}`}
                  />
                ))
              )}
            </>
          )}
        </Stack>
      </CollapseCard>

      {withMyCards && (
        <CollapseCard
          {...cardsBox(
            cards.length > 0,
            sumUsedQuota([...creditQuotas]),
            cards.flatMap(card => card.tags || [])
          )}
        >
          <Stack direction="column" gap={inube.spacing.s100}>
            {loadingCards ? (
              <>
                <Product loading />
                <Product loading />
              </>
            ) : (
              <>
                {cards.length === 0 ? (
                  <Product empty />
                ) : (
                  cards.map((card) => (
                    <Product
                      type="compact"
                      key={card.id}
                      title={card.title.split(' - ')[1] || card.title}
                      description={String(card.description.split(' - ')[1] || "")}
                      attributes={formatCardCurrencyAttrs(
                        extractCardAttributesWithUsedQuota(card, creditQuotas)
                      )}
                      tags={card.tags}
                      breakpoints={cardAttributeBreakpoints}
                      navigateTo={`/my-cards/${card.id}`}
                    />
                  ))
                )}
              </>
            )}
          </Stack>
        </CollapseCard>
      )}

      <Stack
        padding={`0 ${inube.spacing.s200}`}
        gap={inube.spacing.s100}
      >
        <Text type="title" size="medium">
          Tus pagos
        </Text>
      </Stack>

      <CollapseCard
        {...commitmentsBox(
          commitments.length > 0,
          sumCommitmentNextPaymentValue(commitments),
          commitments.flatMap(commitment => commitment.tag ? [commitment.tag] : [])
        )}
      >
        <Stack direction="column" gap={inube.spacing.s200}>
          {loadingCredits ? (
            <>
              <Product loading />
              <Product loading />
            </>
          ) : (
            <>
              {commitments.length === 0 ? (
                <Product empty />
              ) : (
                <ProductsCommitments commitments={commitments} isMobile={isMobile} />
              )}
            </>
          )}
        </Stack>
      </CollapseCard>
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
  creditQuotas: IProduct[];
  loadingSavings: boolean;
  loadingCredits: boolean;
  loadingCards: boolean;
  isDesktop: boolean;
  isMobile: boolean;
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
    creditQuotas,
    loadingSavings,
    loadingCredits,
    loadingCards,
    isDesktop,
    isMobile,
  } = props;

  const { user } = useContext(AppContext);
  const [currentTime, setCurrentTime] = useState(new Date());
  const { getFlag } = useContext(AppContext);
  const quickLinksArray = useQuickLinks();

  useEffect(() => {
    const currentTimeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(currentTimeInterval);
  }, []);

  const withMyCards = getFlag("admin.cards.cards.my-cards").value;

  return (
    <>
      <Stack direction="column" gap={inube.spacing.s200}>
        <Stack gap={inube.spacing.s100}>
          <Text type="label" size="medium" appearance="gray">
            Fecha y hora:
          </Text>
          <Text type="body" size="small" appearance="gray">
            {formatTraceabilityDate(currentTime)}
          </Text>
        </Stack>
        <Title
          title={`Hola, ${capitalizeEachWord(user.firstName)}`}
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
            creditQuotas,
            loadingSavings,
            loadingCredits,
            loadingCards,
            withMyCards,
            isMobile
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
            creditQuotas,
            loadingSavings,
            loadingCredits,
            loadingCards,
            withMyCards,
            isMobile
          )}
          <QuickAccess links={quickLinksArray} />
        </Grid>
      )}
    </>
  );
}

export { HomeUI };
