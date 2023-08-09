import { MdArrowBack, MdOutlineAttachMoney } from "react-icons/md";

import { useMediaQuery } from "@hooks/useMediaQuery";

import { Text } from "@design/data/Text";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";

import { Box } from "@components/cards/Box";
import { Product } from "@components/cards/Product";
import { QuickAccess } from "@components/cards/QuickAccess";

import { quickLinks } from "@config/quickLinks";

import { Title } from "@design/data/Title";
import { creditsMock } from "@mocks/products/credits/credits.mocks";
import { myCredits } from "./config/boxes";
import {
  extractMyCreditAttributes,
  myCreditAttributeBreakpoints,
} from "./config/products";

function MyCredits() {
  const mquery = useMediaQuery("(min-width: 1400px)");

  return (
    <>
      <Title
        title="Mis créditos"
        subtitle="Consulta y solicita tus productos"
        icon={<MdArrowBack />}
        navigatePage="/"
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
          <Box {...myCredits}>
            <Stack direction="column" gap="s075">
              {creditsMock.length === 0 ? (
                <Product empty={true} icon={<MdOutlineAttachMoney />} />
              ) : (
                creditsMock.map((credit) => (
                  <Product
                    id={credit.id}
                    key={credit.id}
                    title={credit.title}
                    description={credit.id}
                    attributes={extractMyCreditAttributes(credit)}
                    breakpoints={myCreditAttributeBreakpoints}
                    tags={credit.tags}
                    icon={<MdOutlineAttachMoney />}
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

export { MyCredits };
