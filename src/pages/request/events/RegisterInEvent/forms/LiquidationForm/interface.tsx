import { LiquidationCard } from "@components/cards/LiquidationCard";
import { OutlineCard } from "@components/cards/OutlineCard";
import { inube } from "@design/tokens";
import { Divider, Stack, Text } from "@inubekit/inubekit";
import { currencyFormat } from "@utils/currency";
import { FormikProps } from "formik";
import { ILiquidationEntry } from "./types";

interface LiquidationFormUIProps {
  formik: FormikProps<ILiquidationEntry>;
}

function LiquidationFormUI(props: LiquidationFormUIProps) {
  const { formik } = props;

  return (
    <form>
      <OutlineCard>
        <Stack
          direction="column"
          gap={inube.spacing.s200}
          padding={inube.spacing.s200}
          width="100%"
        >
          {formik.values.entriesCategories.map((category) => (
            <LiquidationCard
              key={category.id}
              categoyName={category.name}
              unitValue={category.value}
              entriesCount={category.count || 0}
              fullValue={category.fullValue || 0}
              subTotal={category.subTotal || 0}
              subsidyName={category.subsidyName}
              subisidyValue={category.subsidyValue}
            />
          ))}

          <Divider dashed />

          <Stack direction="row" justifyContent="flex-end">
            <OutlineCard>
              <Stack
                direction="row"
                padding={`${inube.spacing.s100} ${inube.spacing.s200}`}
                gap={inube.spacing.s100}
              >
                <Text type="title" size="medium" weight="bold">
                  Total a pagar:
                </Text>
                <Text
                  type="title"
                  size="medium"
                  weight="bold"
                  appearance="gray"
                >
                  {currencyFormat(formik.values.totalValue)}
                </Text>
              </Stack>
            </OutlineCard>
          </Stack>
        </Stack>
      </OutlineCard>
    </form>
  );
}

export { LiquidationFormUI };
