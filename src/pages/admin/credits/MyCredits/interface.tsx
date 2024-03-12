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
import { Breadcrumbs } from "@design/navigation/Breadcrumbs";
import { inube } from "@design/tokens";
import { IProduct } from "src/model/entity/product";
import { myCredits } from "./config/boxes";
import { crumbsMyCredits } from "./config/navigation";
import { creditAttributeBreakpoints } from "@pages/admin/home/config/products";
import {
  formatCreditCurrencyAttrs,
  extractCreditAttributes,
} from "../Credit/config/product";

interface MyCreditsUIProps {
  loading: boolean;
  credits: IProduct[];
}

function MyCreditsUI(props: MyCreditsUIProps) {
  const { loading, credits } = props;
  const isDesktop = useMediaQuery("(min-width: 1400px)");

  return (
    <>
      <Stack direction="column" gap="s300">
        <Breadcrumbs crumbs={crumbsMyCredits} />
        <Title
          title="Mis créditos"
          subtitle="Consulta y solicita tus productos"
          icon={<MdArrowBack />}
          navigatePage="/"
        />
      </Stack>

      <Grid
        gap="s600"
        margin={
          isDesktop ? `${inube.spacing.s600} 0 0` : `${inube.spacing.s300} 0 0`
        }
        templateColumns={isDesktop ? "1fr 250px" : "1fr"}
      >
        <Stack direction="column" gap="s300">
          <Text type="title" size="medium">
            Tus productos
          </Text>
          <Box {...myCredits}>
            <Stack direction="column" gap="s075">
              {loading ? (
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
        </Stack>
        {isDesktop && <QuickAccess links={quickLinks} />}
      </Grid>
    </>
  );
}

export { MyCreditsUI };
