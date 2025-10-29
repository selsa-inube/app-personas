import { BoxAttribute } from "@components/cards/BoxAttribute";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import {
  Box,
  Grid,
  Message,
  Moneyfield,
  SkeletonLine,
  Stack,
} from "@inubekit/inubekit";
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

  const isMobile = useMediaQuery("(max-width: 700px)");

  const hasValidInvestmentLimits =
    formik.values.product?.maxInvestment !== undefined &&
    formik.values.product?.maxInvestment !== null &&
    formik.values.product?.maxInvestment !== 0 &&
    formik.values.product?.minInvestment !== undefined &&
    formik.values.product?.minInvestment !== null &&
    formik.values.product?.minInvestment !== 0;

  const valueInvestment = (valor: number) => {
    return hasValidInvestmentLimits
      ? currencyFormat(valor || 0)
      : "Sin definir";
  }

  return (
    <form>
      <Stack direction="column" gap={inube.spacing.s300}>
        {!loading && !formik.values.product ? (
          <Message
            title="No hay productos disponibles para la solicitud, intenta nuevamente más tarde. Por favor, inténtalo de nuevo más tarde."
            appearance="help"
            size={isMobile ? "medium" : "large"}
          />
        ) : (
          <>
            {
              !hasValidInvestmentLimits && (
                <Message
                  title="No es posible avanzar porque el producto no tiene definido el rango permitido para invertir. Por favor, inténtelo más tarde."
                  appearance="danger"
                  size={isMobile ? "medium" : "large"}
                />
              )
            }
            <Box padding={inube.spacing.s200}>
              <Grid
                templateColumns={`repeat(${isMobile ? 1 : 2}, 1fr)`}
                autoRows="auto"
                gap={inube.spacing.s200}
              >
                {loading ? (
                  <>
                    <SkeletonLine animated />
                    <SkeletonLine animated />
                  </>
                ) : (
                  <>
                    <BoxAttribute
                      label="Inversión mínima:"
                      labelTextSize={isMobile ? "medium" : "large"}
                      value={valueInvestment(formik.values.product?.minInvestment || 0)}
                      buttonDisabled={hasValidInvestmentLimits}
                    />
                    <BoxAttribute
                      label="Inversión máxima:"
                      labelTextSize={isMobile ? "medium" : "large"}
                      value={valueInvestment(formik.values.product?.maxInvestment || 0)}
                      buttonDisabled={hasValidInvestmentLimits}
                    />
                  </>
                )}
              </Grid>
            </Box>

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
                disabled={loading || !hasValidInvestmentLimits}
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
          </>
        )}
      </Stack>
    </form>
  );
}

export { InvestmentFormUI };
