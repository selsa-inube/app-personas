import { OutlineCard } from "@components/cards/OutlineCard";
import { TextField } from "@design/input/TextField";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Grid } from "@inubekit/grid";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { FormikProps } from "formik";
import { MdOutlineAttachMoney } from "react-icons/md";
import {
  currencyFormat,
  handleChangeWithCurrency,
  validateCurrencyField,
} from "src/utils/currency";
import { getFieldState } from "src/utils/forms/forms";
import { IInvestmentEntry } from "./types";

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
          <TextField
            label="Valor de la inversión"
            placeholder="Ingresa el valor a invertir"
            name="investmentValue"
            id="investmentValue"
            value={validateCurrencyField("investmentValue", formik) || ""}
            type="text"
            errorMessage={formik.errors.investmentValue}
            isDisabled={loading}
            size="compact"
            isFullWidth
            state={getFieldState(formik, "investmentValue")}
            onBlur={formik.handleBlur}
            onChange={(e) => {
              handleChangeWithCurrency(formik, e);
            }}
            iconAfter={<MdOutlineAttachMoney />}
            isRequired
          />
        </Grid>
      </Stack>
    </form>
  );
}

export { InvestmentFormUI };
