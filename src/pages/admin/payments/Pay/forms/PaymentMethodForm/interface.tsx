import { PaymentMethodCard } from "@components/cards/PaymentMethodCard";
import { Icon } from "@design/data/Icon";
import { Text } from "@design/data/Text";
import { Fieldset } from "@design/input/Fieldset";
import { Select } from "@design/input/Select";
import { Divider } from "@design/layout/Divider";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { FormikProps } from "formik";
import { MdReportProblem } from "react-icons/md";
import { currencyFormat } from "src/utils/currency";
import { paymentMethods } from "./config/payment";
import { IMoneySource, IPaymentMethodEntry } from "./types";

const renderMoneySources = (
  moneySources: IMoneySource,
  paymentMethod: string,
  valueToPay: number,
  onChangeMoneySource: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onSelectMoneySource: (id: string) => void,
) => {
  return Object.entries(moneySources).map(([key, moneySource]) => (
    <PaymentMethodCard
      key={key}
      moneySource={moneySource}
      paymentMethod={paymentMethod}
      valueToPay={valueToPay}
      onChangeMoneySource={onChangeMoneySource}
      onSelectMoneySource={onSelectMoneySource}
    />
  ));
};

interface PaymentMethodFormUIProps {
  formik: FormikProps<IPaymentMethodEntry>;
  showFundsAlert: boolean;
  customHandleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onChangeMoneySource: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectMoneySource: (id: string) => void;
}

function PaymentMethodFormUI(props: PaymentMethodFormUIProps) {
  const {
    formik,
    showFundsAlert,
    customHandleChange,
    onChangeMoneySource,
    onSelectMoneySource,
  } = props;

  const isTablet = useMediaQuery("(max-width: 1100px)");
  const isMobile = useMediaQuery("(max-width: 550px)");

  return (
    <form>
      <Stack gap={isMobile ? "s200" : "s300"} direction="column">
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
              templateColumns={isTablet ? "1fr" : "1fr 1fr"}
              gap={isMobile ? "s200" : "s300"}
            >
              {renderMoneySources(
                formik.values.moneySources,
                formik.values.paymentMethod,
                formik.values.valueToPay,
                onChangeMoneySource,
                onSelectMoneySource,
              )}
            </Grid>

            <Stack direction="column" gap="s100">
              <Divider dashed />

              <Fieldset title="Resumen">
                <Stack gap="s100" direction="column">
                  <Stack gap="s200" alignItems="center">
                    <Text type="title" size="small" appearance="gray">
                      Valor a pagar:
                    </Text>
                    <Text type="title" size="small">
                      {currencyFormat(formik.values.valueToPay)}
                    </Text>
                  </Stack>
                  <Stack gap="s200" alignItems="center">
                    <Text type="title" size="small" appearance="gray">
                      Valor pagado:
                    </Text>
                    <Text type="title" size="small">
                      {currencyFormat(formik.values.paidValue)}
                    </Text>
                  </Stack>
                  <Stack gap="s200" alignItems="center">
                    <Stack gap="s075" alignItems="center">
                      <Text type="title" size="small" appearance="gray">
                        Valor pendiente:
                      </Text>
                      {showFundsAlert && (
                        <Icon
                          appearance="error"
                          icon={<MdReportProblem />}
                          size="20px"
                          spacing="none"
                        />
                      )}
                    </Stack>

                    <Text type="title" size="small">
                      {currencyFormat(formik.values.pendingValue)}
                    </Text>
                  </Stack>
                </Stack>
              </Fieldset>
            </Stack>
          </>
        )}
      </Stack>
    </form>
  );
}

export { PaymentMethodFormUI };
