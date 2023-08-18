import { Box } from "@components/cards/Box";
import { Product } from "@components/cards/Product";
import { QuickAccess } from "@components/cards/QuickAccess";
import { quickLinks } from "@config/quickLinks";
import { Title } from "@design/data/Title";
import { Select } from "@design/input/Select";
import { ISelectOption } from "@design/input/Select/types";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";
import { Breadcrumbs } from "@design/navigation/Breadcrumbs";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import creditsMock from "@mocks/products/credits/credits.mocks";
import { useEffect, useState } from "react";
import { MdArrowBack, MdOutlineAttachMoney } from "react-icons/md";
import { useParams } from "react-router-dom";
import { myCredits } from "../MyCredits/config/boxes";
import { crumbsMyCredits } from "../MyCredits/config/navigation";
import {
  extractMyCreditAttributes,
  myCreditAttributeBreakpoints,
} from "../MyCredits/config/products";

function Credit() {
  const { credit_id } = useParams();
  const [selectedProduct, setSelectedProduct] = useState<string>();
  const [productsOptions, setProductsOptions] = useState<ISelectOption[]>([]);
  const mquery = useMediaQuery("(min-width: 1400px)");

  useEffect(() => {
    setSelectedProduct(credit_id);
    const creditsOptions: ISelectOption[] = creditsMock.map((credit) => ({
      id: credit.id,
      value: `Crédito ${credit.title} - ${credit.id}`,
      children: `Crédito ${credit.title} - ${credit.id}`,
      label: credit.title,
      isDisabled: false,
    }));
    setProductsOptions(creditsOptions);
  }, []);

  const handleChangeProduct = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedProduct(event.target.value);
  };

  return (
    <>
      <Stack direction="column" gap="s300">
        <Breadcrumbs crumbs={crumbsMyCredits} />
        <Title
          title="Consulta de Créditos"
          subtitle="Información detallada de tus productos de crédito"
          icon={<MdArrowBack />}
          navigatePage="/my-credits"
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
          <Select
            id="products"
            handleChange={handleChangeProduct}
            label="Seleccion de producto"
            options={productsOptions}
            value={selectedProduct}
          />
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
                    navigateTo={`/my-credits/${credit.id}`}
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

export { Credit };
