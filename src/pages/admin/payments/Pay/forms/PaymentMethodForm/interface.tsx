import { StyledInputRadio } from "@components/cards/PaymentCard/styles";
import { Icon } from "@design/data/Icon";
import { Tag } from "@design/data/Tag";
import { Text } from "@design/data/Text";
import { Fieldset } from "@design/input/Fieldset";
import { Select } from "@design/input/Select";
import { TextField } from "@design/input/TextField";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { FormikProps } from "formik";
import { MdReportProblem } from "react-icons/md";
import { currencyFormat } from "src/utils/currency";
import { paymentMethods } from "./config/payment";
import { StyledLabelPaymentMethod } from "./styles";
import { IMoneySource, IPaymentMethodEntry } from "./types";

const renderMoneySources = (
  moneySources: IMoneySource,
  paymentMethod: string,
  valueToPay: number,
  isMobile: boolean,
  onChangeMoneySource: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onSelectMoneySource: (id: string) => void,
) => {
  return Object.entries(moneySources).map(([key, moneySource]) => (
    <Grid
      templateColumns={isMobile ? "1fr" : "78% 20%"}
      gap="s150"
      alignContent="center"
      key={key}
    >
      {!isMobile && (
        <StyledLabelPaymentMethod
          onClick={() => onSelectMoneySource(moneySource.id)}
        >
          {moneySource.type === "savingAccount" &&
            paymentMethod === "debit" && (
              <StyledInputRadio
                id={`radio-${key}`}
                type="radio"
                checked={moneySource.value !== 0}
                readOnly
                value={valueToPay}
              />
            )}
          <Text type="body" size="medium">
            {moneySource.label}
          </Text>

          {moneySource.value > moneySource.balance && (
            <Tag label="Fondos insuficientes" appearance="error" />
          )}
        </StyledLabelPaymentMethod>
      )}

      <TextField
        id={key}
        name={key}
        placeholder=""
        label={isMobile ? moneySource.label : undefined}
        value={currencyFormat(
          (paymentMethod === "multiple" ? moneySource.value : valueToPay) || 0,
        )}
        onChange={onChangeMoneySource}
        isFullWidth
        isDisabled={paymentMethod !== "multiple"}
        size="compact"
        state={moneySource.value > moneySource.balance ? "invalid" : "pending"}
      />
    </Grid>
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
      <Stack gap={isMobile ? "s300" : "s400"} direction="column">
        <Stack width={isMobile ? "100%" : "50%"}>
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
        </Stack>

        {formik.values.paymentMethod && formik.values.moneySources && (
          <Grid
            templateColumns={isTablet ? "1fr" : "68% 30%"}
            gap={isMobile ? "s250" : "s300"}
            width="100%"
          >
            <Fieldset title="Fuentes de dinero">
              <Stack gap="s250" direction="column">
                <Text type="body" size="medium" appearance="gray">
                  Cuéntanos como quieres pagar tu obligación, digitando los
                  valores en cada una de las fuentes de dinero.
                </Text>

                {renderMoneySources(
                  formik.values.moneySources,
                  formik.values.paymentMethod,
                  formik.values.valueToPay,
                  isMobile,
                  onChangeMoneySource,
                  onSelectMoneySource,
                )}
              </Stack>
            </Fieldset>

            <Fieldset
              title="Resumen"
              height="fit-content"
              width={isMobile ? "auto" : isTablet ? "fit-content" : "auto"}
            >
              <Stack gap="s100" direction="column">
                <Stack
                  gap="s150"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Text type="title" size="small" appearance="gray">
                    Valor a pagar:
                  </Text>
                  <Text type="title" size="small">
                    {currencyFormat(formik.values.valueToPay)}
                  </Text>
                </Stack>
                <Stack
                  gap="s150"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Text type="title" size="small" appearance="gray">
                    Valor pagado:
                  </Text>
                  <Text type="title" size="small">
                    {currencyFormat(formik.values.paidValue)}
                  </Text>
                </Stack>
                <Stack
                  gap="s150"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Stack gap="s075" alignItems="center">
                    <Text type="title" size="small" appearance="gray">
                      Valor pendiente:
                    </Text>
                    {formik.values.pendingValue > 0 && showFundsAlert && (
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
          </Grid>
        )}
      </Stack>
    </form>
  );
}

export { PaymentMethodFormUI };
