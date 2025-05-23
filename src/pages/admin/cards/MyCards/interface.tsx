import {
  MdArrowBack,
  MdOutlineAttachMoney,
  MdOutlineCreditCard,
} from "react-icons/md";

import { useMediaQuery } from "@hooks/useMediaQuery";

import { Box } from "@components/cards/Box";
import { Product } from "@components/cards/Product";
import { QuickAccess } from "@components/cards/QuickAccess";

import { Title } from "@design/data/Title";
import { inube } from "@design/tokens";
import { myCards } from "./config/boxes";
import { crumbsMyCards } from "./config/navigation";

import { Breadcrumbs, Grid, Stack, Text } from "@inubekit/inubekit";
import {
  cardAttributeBreakpoints,
  extractCardAttributes,
} from "@pages/admin/home/config/products";
import { IProduct } from "src/model/entity/product";
import { useQuickLinks } from "@hooks/useQuickLinks";

interface MyCardsUIProps {
  loading: boolean;
  cards: IProduct[];
  withRequestCard: boolean;
}

function MyCardsUI(props: MyCardsUIProps) {
  const { loading, cards, withRequestCard } = props;
  const quickLinksArray = useQuickLinks();
  const isDesktop = useMediaQuery("(min-width: 1400px)");

  return (
    <>
      <Stack direction="column" gap={inube.spacing.s300}>
        <Breadcrumbs crumbs={crumbsMyCards} />
        <Title
          title="Mis tarjetas"
          subtitle="Consulta y solicita tus tarjetas"
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
          <Box {...myCards(withRequestCard)}>
            <Stack direction="column" gap={inube.spacing.s075}>
              {loading ? (
                <>
                  <Product loading />
                  <Product loading />
                </>
              ) : (
                <>
                  {cards.length === 0 ? (
                    <Product empty={true} icon={<MdOutlineAttachMoney />} />
                  ) : (
                    cards.map((card) => (
                      <Product
                        key={card.id}
                        title={card.title}
                        description={card.description}
                        attributes={extractCardAttributes(card)}
                        breakpoints={cardAttributeBreakpoints}
                        tags={card.tags}
                        icon={<MdOutlineCreditCard />}
                        navigateTo={`/my-cards/${card.id}`}
                      />
                    ))
                  )}
                </>
              )}
            </Stack>
          </Box>
        </Stack>
        {isDesktop && <QuickAccess links={quickLinksArray} />}
      </Grid>
    </>
  );
}

export { MyCardsUI };
