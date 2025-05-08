import { OutlineCard } from "@components/cards/OutlineCard";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Grid, Moneyfield, Stack, Text } from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { MdOutlineAttachMoney } from "react-icons/md";
import {
  currencyFormat,
  handleChangeWithCurrency,
  validateCurrencyField,
} from "src/utils/currency";
import { IInvestmentEntry } from "./types";
import { getFieldState } from "src/utils/forms/forms";

interface InvestmentFormUIProps {
  formik: FormikProps<IInvestmentEntry>;
  loading?: boolean;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
}

function InvestmentFormUI(props: InvestmentFormUIProps) {
  const { formik, loading } = props;

  const isMobile = useMediaQuery("(max-width: 650px)");

  return (
    <form>
      <Stack direction="column" gap={inube.spacing.s300}>
        <Stack direction="column" gap={inube.spacing.s200}>
          <Grid
            templateColumns={`repeat(${isMobile ? 1 : 2}, 1fr)`}
            autoRows="auto"
            gap={inube.spacing.s200}
          >
            <OutlineCard>
              <Stack
                direction="column"
                padding={`${inube.spacing.s150} ${inube.spacing.s200}`}
                gap={inube.spacing.s025}
              >
                <Text type="label" size="medium" weight="bold">
                  Inversión mínima:
                </Text>
                <Text type="body" size="medium" appearance="gray">
                  {currencyFormat(formik.values.product?.minInvestment || 0)}
                </Text>
              </Stack>
            </OutlineCard>

            <OutlineCard>
              <Stack
                direction="column"
                padding={`${inube.spacing.s150} ${inube.spacing.s200}`}
                gap={inube.spacing.s025}
              >
                <Text type="label" size="medium" weight="bold">
                  Inversión máxima:
                </Text>
                <Text type="body" size="medium" appearance="gray">
                  {currencyFormat(formik.values.product?.maxInvestment || 0)}
                </Text>
              </Stack>
            </OutlineCard>
          </Grid>
        </Stack>

        <Grid
          templateColumns={`repeat(${isMobile ? 1 : 2}, 1fr)`}
          autoRows="auto"
          gap={inube.spacing.s200}
        >
          <Moneyfield
            label="Valor de la inversión"
            placeholder="Ingresa el valor a invertir"
            name="investmentValue"
            id="investmentValue"
            value={validateCurrencyField("investmentValue", formik) || ""}
            type="text"
            message={formik.errors.investmentValue}
            disabled={loading}
            size="compact"
            fullwidth
            status={getFieldState(formik, "investmentValue")}
            onBlur={formik.handleBlur}
            onChange={(e) => {
              handleChangeWithCurrency(formik, e);
            }}
            iconAfter={<MdOutlineAttachMoney />}
            required
          />
        </Grid>
      </Stack>
    </form>
  );
}

export { InvestmentFormUI };
