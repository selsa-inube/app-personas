import { Box } from "@components/cards/Box";
import { Product } from "@components/cards/Product";
import { QuickAccess } from "@components/cards/QuickAccess";
import { quickLinks } from "@config/quickLinks";
import { Title } from "@design/data/Title";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Breadcrumbs, Grid, Stack, Text } from "@inubekit/inubekit";
import { ProductsCommitments } from "@pages/admin/home/ProductsCommitments";
import {
  extractInvestmentAttributes,
  extractSavingsAttributes,
  formatInvestmentCurrencyAttrs,
  formatSavingsCurrencyAttrs,
  investmentAttributeBreakpoints,
  savingAttributeBreakpoints,
  sumNetValue,
} from "@pages/admin/home/config/products";
import { StyledCommitmentsContainer } from "@pages/admin/home/styles";
import { MdArrowBack, MdOutlineAccountBalanceWallet } from "react-icons/md";
import { ICommitment, IProduct } from "src/model/entity/product";
import {
  investmentIcons,
  savingsAccountIcons,
} from "../SavingsAccount/config/saving";
import { mySavingsBox } from "./config/boxes";
import { crumbsMySavings } from "./config/navigation";

function renderMySavingsContent(
  commitments: ICommitment[],
  savingsAccounts: IProduct[],
  savingsContributions: IProduct[],
  loading: boolean,
  cdats: IProduct[],
  programmedSavings: IProduct[],
  isTablet: boolean,
  withRequestSaving: boolean,
) {
  return (
    <Stack direction="column" gap={inube.spacing.s300}>
      <Text type="title" size="medium">
        Tus productos
      </Text>
      <Box {...mySavingsBox(withRequestSaving)}>
        <Stack direction="column" gap={inube.spacing.s100}>
          {loading ? (
            <Stack direction="column" gap={inube.spacing.s200}>
              <Product loading />
              <Product loading />
            </Stack>
          ) : (
            <>
              <Stack direction="column" gap={inube.spacing.s200}>
                {!loading &&
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

              <Stack direction="column" gap={inube.spacing.s250}>
                {savingsAccounts && savingsAccounts.length > 0 && (
                  <Stack direction="column" gap={inube.spacing.s200}>
                    <Text type="label" size="medium">
                      Cuentas
                    </Text>
                    <Stack direction="column" gap={inube.spacing.s100}>
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
                  <Stack direction="column" gap={inube.spacing.s200}>
                    <Text type="label" size="medium">
                      Aportes estatutarios
                    </Text>
                    <Stack direction="column" gap={inube.spacing.s100}>
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
                  <Stack direction="column" gap={inube.spacing.s200}>
                    <Text type="label" size="medium">
                      CDAT
                    </Text>
                    <Stack direction="column" gap={inube.spacing.s100}>
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
                  <Stack direction="column" gap={inube.spacing.s200}>
                    <Text type="label" size="medium">
                      Ahorros programados
                    </Text>
                    <Stack direction="column" gap={inube.spacing.s100}>
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
                    gap={inube.spacing.s100}
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
                  <Stack direction="column" gap={inube.spacing.s200}>
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
    </Stack>
  );
}

interface MySavingsUIProps {
  commitments: ICommitment[];
  savingsAccounts: IProduct[];
  savingsContributions: IProduct[];
  cdats: IProduct[];
  programmedSavings: IProduct[];
  loading: boolean;
  isTablet: boolean;
  withRequestSaving: boolean;
}

function MySavingsUI(props: MySavingsUIProps) {
  const {
    commitments,
    savingsAccounts,
    savingsContributions,
    cdats,
    programmedSavings,
    loading,
    isTablet,
    withRequestSaving,
  } = props;

  const isDesktop = useMediaQuery("(min-width: 1440px)");

  return (
    <>
      <Stack direction="column" gap={inube.spacing.s300}>
        <Breadcrumbs crumbs={crumbsMySavings} />
        <Title
          title="Mis ahorros"
          subtitle="Consulta y solicita tus productos"
          icon={<MdArrowBack />}
          navigatePage="/"
        />
      </Stack>

      {!isDesktop ? (
        <Stack direction="column" margin={`${inube.spacing.s300} 0 0`}>
          {renderMySavingsContent(
            commitments,
            savingsAccounts,
            savingsContributions,
            loading,
            cdats,
            programmedSavings,
            isTablet,
            withRequestSaving,
          )}
        </Stack>
      ) : (
        <Grid
          gap={inube.spacing.s600}
          margin={`${inube.spacing.s600} 0 0`}
          templateColumns="1fr 250px"
        >
          {renderMySavingsContent(
            commitments,
            savingsAccounts,
            savingsContributions,
            loading,
            cdats,
            programmedSavings,
            isTablet,
            withRequestSaving,
          )}
          <QuickAccess links={quickLinks} />
        </Grid>
      )}
    </>
  );
}

export { MySavingsUI };
