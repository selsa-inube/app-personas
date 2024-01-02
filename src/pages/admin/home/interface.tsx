import { useMediaQuery } from "@hooks/useMediaQuery";

import { Text } from "@design/data/Text";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";

import { Box } from "@components/cards/Box";
import { QuickAccess } from "@components/cards/QuickAccess";

import { quickLinks } from "@config/quickLinks";

import { inube } from "@design/tokens";
import { StyledCommitmentsContainer } from "./styles";

import { Product } from "@components/cards/Product";
import { Title } from "@design/data/Title";
import { useAuth } from "@inube/auth";
import { savingsCommitmentsMock } from "@mocks/products/savings/savingsCommitments.mocks";
import {
  MdOutlineAccountBalanceWallet,
  MdOutlineAttachMoney,
  MdOutlineCreditCard,
} from "react-icons/md";
import { ICommitment, IProduct } from "src/model/entity/product";
import { truncateAndObfuscateDescription } from "src/utils/texts";
import {
  investmentIcons,
  savingsAccountIcons,
} from "../savings/SavingsAccount/config/saving";
import { ProductsCommitments } from "./ProductsCommitments";
import { cardsBox, creditsBox, savingsBox } from "./config/boxes";
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

function renderHomeContent(
  productsCommitments: ICommitment[],
  savingsAccountsMock: IProduct[],
  savingsStatutoryContributionsMock: IProduct[],
  credits: IProduct[],
  cdats?: IProduct[],
  programmedSavings?: IProduct[]
) {
  return (
    <>
      <Stack direction="column" gap="s300">
        <Text type="title" size="medium">
          Tus productos
        </Text>
        <Box {...savingsBox}>
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
            {cdats && cdats.length > 0 && (
              <Stack direction="column" gap="s200">
                <Text type="label" size="medium">
                  CDAT
                </Text>
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
                      id={investment.id}
                      key={investment.id}
                      title={investment.title}
                      description={investment.id}
                      attributes={formatInvestmentCurrencyAttrs(
                        extractInvestmentAttributes(investment)
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
            <Stack justifyContent="flex-end" gap="s100">
              <Text type="label" size="large">
                Total ahorrado :
              </Text>
              <Text type="body" size="medium" appearance="gray">
                $ 14.734.650
              </Text>
            </Stack>
            {productsCommitments.length > 0 && (
              <>
                <Text type="label" size="medium">
                  Compromisos
                </Text>
                <StyledCommitmentsContainer>
                  <ProductsCommitments
                    productsCommitments={productsCommitments}
                  />
                </StyledCommitmentsContainer>
              </>
            )}
          </Stack>
        </Box>
        <Box {...creditsBox}>
          <Stack direction="column" gap="s100">
            {credits.length === 0 ? (
              <Product empty={true} icon={<MdOutlineAttachMoney />} />
            ) : (
              credits.map((credit) => (
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
        <Box {...cardsBox}>
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
    </>
  );
}

interface HomeUIProps {
  productsCommitments: ICommitment[];
  savingsAccountsMock: IProduct[];
  savingsStatutoryContributionsMock: IProduct[];
  credits: IProduct[];
  cdats?: IProduct[];
  programmedSavings?: IProduct[];
}

function HomeUI(props: HomeUIProps) {
  const {
    productsCommitments,
    savingsAccountsMock,
    savingsStatutoryContributionsMock,
    cdats,
    programmedSavings,
    credits,
  } = props;

  const { user } = useAuth();

  const isDesktop = useMediaQuery("(min-width: 1440px)");

  return (
    <>
      <Title
        title={`Bienvenido(a), ${user?.firstName}`}
        subtitle="Aquí tienes un resumen de tus productos "
      />
      {!isDesktop ? (
        <Stack direction="column" margin={`${inube.spacing.s300} 0 0`}>
          {renderHomeContent(
            productsCommitments,
            savingsAccountsMock,
            savingsStatutoryContributionsMock,
            credits,
            cdats,
            programmedSavings
          )}
        </Stack>
      ) : (
        <Grid
          gap="s600"
          margin={`${inube.spacing.s600} 0 0`}
          templateColumns="1fr 250px"
        >
          {renderHomeContent(
            productsCommitments,
            savingsAccountsMock,
            savingsStatutoryContributionsMock,
            credits,
            cdats,
            programmedSavings
          )}
          <QuickAccess links={quickLinks} />
        </Grid>
      )}
    </>
  );
}

export { HomeUI };
