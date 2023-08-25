import { QuickAccess } from "@components/cards/QuickAccess";
import { quickLinks } from "@config/quickLinks";
import { Table } from "@design/data/Table";
import { IAction } from "@design/data/Table/types";
import { Title } from "@design/data/Title";
import { Button } from "@design/input/Button";
import { Select } from "@design/input/Select";
import { ISelectOption } from "@design/input/Select/types";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";
import { Breadcrumbs, IBreadcrumbItem } from "@design/navigation/Breadcrumbs";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import creditsMock from "@mocks/products/credits/credits.mocks";
import { useEffect, useState } from "react";
import { MdAdd, MdArrowBack, MdOpenInNew } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { AmountValue } from "../MyCredits/AmountValue";
import {
  movementsTableBreakpoints,
  movementsTableTitles,
} from "../MyCredits/config/tables";
import { StyledIconView, StyledMovementsContainer } from "./styles";
import { ISelectedProductState } from "./types";

const creditTableActions: IAction[] = [
  {
    id: "1",
    actionName: "Valor",
    content: (movement) => <AmountValue value={movement.totalValue} />,
    mobilePriority: true,
  },
  {
    id: "2",
    actionName: "Ver",
    content: () => (
      <StyledIconView>
        <MdOpenInNew />
      </StyledIconView>
    ),
    mobilePriority: true,
  },
];

function CreditMovements() {
  const { credit_id } = useParams();
  const [selectedProduct, setSelectedProduct] =
    useState<ISelectedProductState>();
  const [productsOptions, setProductsOptions] = useState<ISelectOption[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const mquery = useMediaQuery("(min-width: 1400px)");

  const crumbsMovements: IBreadcrumbItem[] = [
    {
      id: "home",
      path: "/",
      label: "Home",
    },
    {
      id: "myCredits",
      path: "/my-credits",
      label: "Mis créditos",
    },
    {
      id: "credit",
      path: `/my-credits/${credit_id}`,
      label: "Consulta de créditos",
    },
    {
      id: "creditMovements",
      path: `/my-credits/${credit_id}/credit-movements`,
      label: "Movimientos",
      isActive: true,
    },
  ];

  useEffect(() => {
    handleSortProduct();
  }, [credit_id]);

  const handleSortProduct = () => {
    const creditsOptions = creditsMock.map((credit) => {
      const productOption = {
        id: credit.id,
        value: `${credit.title} - ${credit.id}`,
      };

      if (credit.id === credit_id) {
        setSelectedProduct({
          totalMovements: credit.movements?.length || 0,
          movements: credit.movements?.slice(0, 14) || [],
          option: productOption,
        });
      }

      return productOption;
    });

    setProductsOptions(creditsOptions);
  };

  const handleChangeProduct = (option: ISelectOption) => {
    navigate(`/my-credits/${option.id}/credit-movements`);
  };

  const handleAddMovements = () => {
    setLoading(true);

    setTimeout(() => {
      try {
        if (!selectedProduct?.movements) return;

        const foundProduct = creditsMock.find(
          (credit) => credit.id === credit_id
        );

        if (!foundProduct) return;

        const newMovements = foundProduct.movements?.slice(
          selectedProduct.movements.length,
          selectedProduct.movements.length + 5
        );

        if (newMovements) {
          setSelectedProduct({
            ...selectedProduct,
            movements: [...selectedProduct.movements, ...newMovements],
          });
        }
      } finally {
        setLoading(false);
      }
    }, 500);
  };

  if (!selectedProduct) return null;

  return (
    <>
      <Stack direction="column" gap="s300">
        <Breadcrumbs crumbs={crumbsMovements} />
        <Title
          title="Movimientos"
          subtitle="Movimientos recientes del producto"
          icon={<MdArrowBack />}
          navigatePage={`/my-credits/${credit_id}`}
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
            id="creditProducts"
            handleChange={handleChangeProduct}
            label="Selección de producto"
            options={productsOptions}
            value={selectedProduct?.option}
            isFullWidth
          />
          <StyledMovementsContainer>
            <Table
              id="modals"
              titles={movementsTableTitles}
              breakpoints={movementsTableBreakpoints}
              actions={creditTableActions}
              entries={selectedProduct.movements}
              pageLength={selectedProduct.movements.length}
              hideMobileResume
            />
            <Button
              appearance="primary"
              variant="none"
              iconBefore={<MdAdd />}
              handleClick={handleAddMovements}
              load={loading}
              disabled={
                selectedProduct.movements.length ===
                selectedProduct.totalMovements
              }
            >
              Ver más movimientos
            </Button>
          </StyledMovementsContainer>
        </Stack>
        {mquery && <QuickAccess links={quickLinks} />}
      </Grid>
    </>
  );
}

export { CreditMovements };
