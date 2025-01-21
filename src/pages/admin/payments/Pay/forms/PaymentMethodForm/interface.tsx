import { PaymentMethodCard } from "@components/cards/payments/PaymentMethodCard";
import { Select } from "@design/input/Select";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Divider } from "@inubekit/divider";
import { Grid } from "@inubekit/grid";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/inubekit";
import { Text } from "@inubekit/text";
import { FormikProps } from "formik";
import { MdError } from "react-icons/md";
import { currencyFormat } from "src/utils/currency";
import { paymentMethods } from "./config/payment";
import { StyledPendingValueContainer, StyledSummaryContainer } from "./styles";
import { IMoneySource, IPaymentMethodEntry } from "./types";

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
          templateColumns={`repeat(${isMobile ? 1 : 2}, 1fr)`}
          autoRows="auto"
          gap={isMobile ? inube.spacing.s200 : inube.spacing.s300}
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
              templateColumns={`repeat(${isMobile ? 1 : isTablet ? 2 : 3}, 1fr)`}
              gap={isMobile ? inube.spacing.s200 : inube.spacing.s300}
              autoRows="auto"
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
                justifyContent={isMobile ? "flex-start" : "flex-end"}
              >
                <Stack
                  direction="column"
                  gap={inube.spacing.s050}
                  width={isMobile ? "100%" : "initial"}
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
                      weight="bold"
                    >
                      {currencyFormat(formik.values.pendingValue)}
                    </Text>
                  </StyledPendingValueContainer>

                  {formik.values.pendingValue < 0 && (
                    <Stack gap={inube.spacing.s075}>
                      <Icon
                        appearance="danger"
                        icon={<MdError />}
                        size="16px"
                      />

                      <Text
                        type="label"
                        size="medium"
                        appearance="danger"
                        weight="bold"
                      >
                        Sobrepasaste el monto de tu pago
                      </Text>
                    </Stack>
                  )}
                </Stack>
              </Stack>
            </StyledSummaryContainer>
          </>
        )}
      </Stack>
    </form>
  );
}

export { PaymentMethodFormUI };
