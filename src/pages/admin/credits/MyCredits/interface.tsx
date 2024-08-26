import { MdArrowBack, MdOutlineAttachMoney } from "react-icons/md";

import { useMediaQuery } from "@hooks/useMediaQuery";

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
} from "../../home/config/products";
import { Stack } from "@inubekit/stack";
import { Grid } from "@inubekit/grid";
import { Text } from "@inubekit/text";

interface MyCreditsUIProps {
  loading: boolean;
  credits: IProduct[];
  withRequestCredit: boolean;
}

function MyCreditsUI(props: MyCreditsUIProps) {
  const { loading, credits, withRequestCredit } = props;
  const isDesktop = useMediaQuery("(min-width: 1400px)");

  return (
    <>
      <Stack direction="column" gap={inube.spacing.s300}>
        <Breadcrumbs crumbs={crumbsMyCredits} />
        <Title
          title="Mis créditos"
          subtitle="Consulta y solicita tus productos"
          icon={<MdArrowBack />}
          navigatePage="/"
        />
      </Stack>

      <Grid
        gap={inube.spacing.s600}
        templateColumns={isDesktop ? "1fr 250px" : "1fr"}
        margin={
          isDesktop ? `${inube.spacing.s600} 0 0` : `${inube.spacing.s300} 0 0`
        }
      >
        <Stack direction="column" gap={inube.spacing.s300}>
          <Text type="title" size="medium">
            Tus productos
          </Text>
          <Box {...myCredits(withRequestCredit)}>
            <Stack direction="column" gap={inube.spacing.s075}>
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
