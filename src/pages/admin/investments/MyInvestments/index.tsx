import { MdArrowBack, MdOutlineRealEstateAgent } from "react-icons/md";

import { useMediaQuery } from "@hooks/useMediaQuery";

import { Text } from "@design/data/Text";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";

import { Box } from "@components/cards/Box";
import { Product } from "@components/cards/Product";
import { QuickAccess } from "@components/cards/QuickAccess";

import { quickLinks } from "@config/quickLinks";

import { SavingsCommitmentCard } from "@components/cards/SavingsCommitmentCard";
import { Title } from "@design/data/Title";
import { Breadcrumbs } from "@design/navigation/Breadcrumbs";
import { inube } from "@design/tokens";
import { investmentsMock } from "@mocks/products/investments/investments.mocks";
import { investmentsCommitmentsMock } from "@mocks/products/investments/investmentsCommitments.mocks";
import { USER_ID } from "src/App";
import { extractAttribute } from "src/utils/products";
import { investmentIcons } from "../Investment/config/investment";
import { myInvestments } from "./config/boxes";
import { crumbsMyInvestments } from "./config/navigation";
import {
  extractMyInvestmentAttributes,
  formatMyInvestmentCurrencyAttrs,
  myInvestmentAttributeBreakpoints,
} from "./config/products";

const renderInvestmentCommitments = () => {
  return investmentsCommitmentsMock.map((commitment) => {
    const valueToPay = extractAttribute(commitment.attributes, "value_to_pay");
    const nextPayDate = extractAttribute(
      commitment.attributes,
      "next_pay_date"
    );

    return (
      <SavingsCommitmentCard
        key={commitment.id}
        title={commitment.title}
        label="Ver"
        descriptionLabel={nextPayDate?.label}
        descriptionValue={String(nextPayDate?.value)}
        onClick={() => {}}
        value={Number(valueToPay?.value)}
      />
    );
  });
};

function MyInvestments() {
  const smallScreen = useMediaQuery("(min-width: 1400px)");

  const getInvestmentProducts = () => {
    return investmentsMock.filter(
      (investment) => investment.userOwner === USER_ID
    );
  };

  const investmentProducts = getInvestmentProducts();

  return (
    <>
      <Stack direction="column" gap="s300">
        <Breadcrumbs crumbs={crumbsMyInvestments} />
        <Title
          title="Mis inversiones"
          subtitle="Resumen productos de inversión"
          icon={<MdArrowBack />}
          navigatePage="/"
        />
      </Stack>

      <Grid
        gap="s600"
        margin={
          smallScreen
            ? `${inube.spacing.s600} 0 0`
            : `${inube.spacing.s300} 0 0`
        }
        templateColumns={smallScreen ? "1fr 250px" : "1fr"}
      >
        <Stack direction="column" gap="s300">
          <Text type="title" size="medium">
            Tus productos
          </Text>
          <Box {...myInvestments}>
            <Stack direction="column" gap="s200">
              {investmentsCommitmentsMock.length > 0 && (
                <Text type="label" size="medium">
                  Tus productos
                </Text>
              )}

              <Stack direction="column" gap="s100">
                {investmentProducts.length === 0 ? (
                  <Product empty={true} icon={<MdOutlineRealEstateAgent />} />
                ) : (
                  investmentProducts.map((investment) => (
                    <Product
                      id={investment.id}
                      key={investment.id}
                      title={investment.title}
                      description={investment.id}
                      attributes={formatMyInvestmentCurrencyAttrs(
                        extractMyInvestmentAttributes(investment)
                      )}
                      breakpoints={myInvestmentAttributeBreakpoints}
                      tags={investment.tags}
                      icon={investmentIcons[investment.type]}
                      navigateTo={`/my-investments/${investment.id}`}
                    />
                  ))
                )}
              </Stack>

              {investmentsCommitmentsMock.length > 0 && (
                <Text type="label" size="medium">
                  Tus compromisos
                </Text>
              )}

              <Stack direction="column" gap="s100">
                {renderInvestmentCommitments()}
              </Stack>
            </Stack>
          </Box>
        </Stack>
        {smallScreen && <QuickAccess links={quickLinks} />}
      </Grid>
    </>
  );
}

export { MyInvestments };
