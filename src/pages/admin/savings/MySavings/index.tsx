import { Box } from "@components/cards/Box";
import { Product } from "@components/cards/Product";
import { QuickAccess } from "@components/cards/QuickAccess";
import { SavingsCommitmentCard } from "@components/cards/SavingsCommitmentCard";
import { quickLinks } from "@config/quickLinks";
import { Text } from "@design/data/Text";
import { Title } from "@design/data/Title";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";
import { Breadcrumbs } from "@design/navigation/Breadcrumbs";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { savingsMock } from "@mocks/products/savings/savings.mocks";
import { investmentsMock } from "@mocks/products/investments/investments.mocks";
import { USER_ID } from "src/App";
import { savingsCommitmentsMock } from "@mocks/products/savings/savingsCommitments.mocks";
import { MdArrowBack, MdOutlineAccountBalanceWallet } from "react-icons/md";
import { savingsAccountIcons } from "../SavingsAccount/config/saving";
import { investmentIcons } from "../SavingsAccount/config/saving";
import { extractAttribute } from "src/utils/products";
import { mySavingsBox } from "./config/boxes";
import { crumbsMySavings } from "./config/navigation";
import {
  extractMySavingsAttributes,
  formatMySavingsCurrencyAttrs,
  mySavingsAttributeBreakpoints,
} from "./config/products";
import { truncateAndObfuscateDescription } from "src/utils/formats";
import { useNavigate } from "react-router-dom";
import { formatInvestmentCurrencyAttrs } from "@pages/admin/home/config/products";
import { extractInvestmentAttributes } from "@pages/admin/home/config/products";
import { investmentAttributeBreakpoints } from "@pages/admin/home/config/products";
import { investmentsCommitmentsMock } from "@mocks/products/investments/investmentsCommitments.mocks";

const renderSavingCommitments = () => {
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

function MySavings() {
  const mquery = useMediaQuery("(min-width: 1400px)");

  const getSavingProducts = (types: string[]) => {
    return savingsMock.filter((investment) => types.includes(investment.type));
  };

  const savingsAccountsMock = getSavingProducts(["CA"]);
  const savingsStatutoryContributionsMock = getSavingProducts(["APE", "AS"]);

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
                        attributes={formatMySavingsCurrencyAttrs(
                          extractMySavingsAttributes(saving)
                        )}
                        tags={saving.tags}
                        icon={savingsAccountIcons[saving.type]}
                        breakpoints={mySavingsAttributeBreakpoints}
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
                        attributes={formatMySavingsCurrencyAttrs(
                          extractMySavingsAttributes(saving)
                        )}
                        tags={saving.tags}
                        icon={savingsAccountIcons[saving.type]}
                        breakpoints={mySavingsAttributeBreakpoints}
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
                      navigateTo={`/my-savings/account/${investment.id}`}
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
                      navigateTo={`/my-savings/account/${investment.id}`}
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
                {renderSavingCommitments()}
              </Stack>
            </Stack>
          </Box>
        </Stack>
        {mquery && <QuickAccess links={quickLinks} />}
      </Grid>
    </>
  );
}

export { MySavings };
