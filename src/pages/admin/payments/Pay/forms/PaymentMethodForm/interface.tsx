import { PaymentMethodCard } from "@components/cards/payments/PaymentMethodCard";
import { Text } from "@design/data/Text";
import { Select } from "@design/input/Select";
import { Grid } from "@design/layout/Grid";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { FormikProps } from "formik";
import { currencyFormat } from "src/utils/currency";
import { paymentMethods } from "./config/payment";
import { StyledPendingValueContainer, StyledSummaryContainer } from "./styles";
import { IMoneySource, IPaymentMethodEntry } from "./types";
import { Divider } from "@inubekit/divider";
import { Stack } from "@inubekit/stack";
import { inube } from "@design/tokens";

const renderMoneySources = (
  moneySources: IMoneySource,
  paymentMethod: string,
  valueToPay: number,
  onChangeMoneySource: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onSelectMoneySource: (id: string) => void,
  onSaveMoneySource: () => void,
  onRemoveValueMoneySource: (id: string) => void,
) => {
  return Object.entries(moneySources).map(([key, moneySource]) => (
    <PaymentMethodCard
      key={key}
      moneySource={moneySource}
      paymentMethod={paymentMethod}
      valueToPay={valueToPay}
      onChangeMoneySource={onChangeMoneySource}
      onSelectMoneySource={onSelectMoneySource}
      onSaveMoneySource={onSaveMoneySource}
      onRemoveValueMoneySource={onRemoveValueMoneySource}
    />
  ));
};

interface PaymentMethodFormUIProps {
  formik: FormikProps<IPaymentMethodEntry>;
  customHandleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onChangeMoneySource: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectMoneySource: (id: string) => void;
  onSaveMoneySource: () => void;
  onRemoveValueMoneySource: (id: string) => void;
}

function PaymentMethodFormUI(props: PaymentMethodFormUIProps) {
  const {
    formik,
    customHandleChange,
    onChangeMoneySource,
    onSelectMoneySource,
    onSaveMoneySource,
    onRemoveValueMoneySource,
  } = props;

  const isTablet = useMediaQuery("(max-width: 1200px)");
  const isMobile = useMediaQuery("(max-width: 750px)");

  return (
    <form>
      <Stack
        gap={isMobile ? inube.spacing.s200 : inube.spacing.s300}
        direction="column"
        margin={isMobile ? "0 0 210px 0" : "0"}
      >
        <Grid
          templateColumns={isTablet ? "1fr" : "1fr 1fr"}
          gap={isMobile ? "s200" : "s300"}
        >
          <Select
            label="Formas de pago"
            name="paymentMethod"
            id="paymentMethod"
            size="compact"
            isFullWidth
            placeholder="Seleccionar una opción"
            options={paymentMethods}
            onBlur={formik.handleBlur}
            onChange={customHandleChange}
            value={formik.values.paymentMethod || ""}
          />
        </Grid>

        {formik.values.paymentMethod && formik.values.moneySources && (
          <>
            <Grid
              templateColumns={
                isMobile ? "1fr" : isTablet ? "1fr 1fr" : "1fr 1fr 1fr"
              }
              gap={isMobile ? "s200" : "s300"}
            >
              {renderMoneySources(
                formik.values.moneySources,
                formik.values.paymentMethod,
                formik.values.valueToPay,
                onChangeMoneySource,
                onSelectMoneySource,
                onSaveMoneySource,
                onRemoveValueMoneySource,
              )}
            </Grid>

            <StyledSummaryContainer $fixed={isMobile}>
              <Divider dashed />

              <Stack
                alignItems="center"
                justifyContent={isMobile ? "center" : "flex-end"}
                width="100%"
              >
                <StyledPendingValueContainer $isMobile={isMobile}>
                  <Text type="title" size="medium" appearance="dark">
                    Valor pendiente:
                  </Text>

                  <Text
                    type="title"
                    size="medium"
                    appearance={
                      formik.values.pendingValue < 0 ? "danger" : "gray"
                    }
                  >
                    {currencyFormat(formik.values.pendingValue)}
                  </Text>
                </StyledPendingValueContainer>
              </Stack>
            </StyledSummaryContainer>
          </>
        )}
      </Stack>
    </form>
  );
}

export { PaymentMethodFormUI };
