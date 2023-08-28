import { MdArrowBack, MdOutlineRealEstateAgent } from "react-icons/md";

import { useMediaQuery } from "@hooks/useMediaQuery";

import { Text } from "@design/data/Text";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";

import { Box } from "@components/cards/Box";
import { Product } from "@components/cards/Product";
import { QuickAccess } from "@components/cards/QuickAccess";

import { quickLinks } from "@config/quickLinks";

import { Title } from "@design/data/Title";
import { Breadcrumbs } from "@design/navigation/Breadcrumbs";
import { inube } from "@design/tokens";
import { investmentsMock } from "@mocks/products/investments/investments.mocks";
import { myInvestments } from "./config/boxes";
import { crumbsMyInvestments } from "./config/navigation";
import {
  extractMyInvestmentAttributes,
  myInvestmentAttributeBreakpoints,
} from "./config/products";

function MyInvestments() {
  const smallScreen = useMediaQuery("(min-width: 1400px)");
  const userId = "1";

  const getInvestmentProducts = () => {
    return investmentsMock.filter(
      (investment) => investment.userOwner === userId
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
            <Stack direction="column" gap="s075">
              {investmentProducts.length === 0 ? (
                <Product empty={true} icon={<MdOutlineRealEstateAgent />} />
              ) : (
                investmentProducts.map((investment) => (
                  <Product
                    id={investment.id}
                    key={investment.id}
                    title={investment.title}
                    description={investment.id}
                    attributes={extractMyInvestmentAttributes(investment)}
                    breakpoints={myInvestmentAttributeBreakpoints}
                    tags={investment.tags}
                    icon={<MdOutlineRealEstateAgent />}
                    navigateTo={`/my-investments/${investment.id}`}
                  />
                ))
              )}
            </Stack>
          </Box>
        </Stack>
        {smallScreen && <QuickAccess links={quickLinks} />}
      </Grid>
    </>
  );
}

export { MyInvestments };
