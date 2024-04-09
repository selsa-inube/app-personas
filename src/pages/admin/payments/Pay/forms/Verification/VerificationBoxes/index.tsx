import { BoxAttribute } from "@components/cards/BoxAttribute";
import { Text } from "@design/data/Text";
import { Divider } from "@design/layout/Divider";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";
import { ICommentsEntry } from "src/shared/forms/CommentsForm/types";
import { currencyFormat } from "src/utils/currency";
import { IFormsPay } from "../../../types";
import { StyledTotalPayment } from "../../ObligationsForm/styles";
import { IObligationsEntry } from "../../ObligationsForm/types";

const renderObligationsVerification = (
  values: IObligationsEntry,
  isTablet: boolean,
) => {
  const filteredPayments = values.payments.filter(
    (payment) => payment.valueToPay,
  );

  return (
    <Stack width="100%" direction="column" gap="s200">
      {filteredPayments.map((payment) => {
        const selectedPayment = payment.options.find(
          (option) => option.selected,
        );

        const applyPay = payment.applyPayOption && payment.applyPayOption.label;

        return (
          <>
            <Grid templateColumns={isTablet ? "1fr" : "1fr 1fr"} gap="s100">
              <BoxAttribute
                label="Nombre de la obligación:"
                value={payment.title}
              />
              <BoxAttribute label="Numero de obligación:" value={payment.id} />
              <BoxAttribute
                label="Tipo de pago:"
                value={selectedPayment?.label || "Próximo vencimiento"}
              />
              <BoxAttribute
                label="Valor del pago:"
                value={`${currencyFormat(payment.valueToPay || 0)}`}
              />
              {applyPay && (
                <BoxAttribute label="Pago aplicado a:" value={applyPay} />
              )}
            </Grid>
            {filteredPayments.length > 1 && <Divider dashed />}
          </>
        );
      })}

      <Stack justifyContent="flex-end" width="100%">
        <StyledTotalPayment isMobile={isTablet}>
          <Text type="title" size="small">
            Total a pagar hoy:
          </Text>
          <Text type="body" size="medium">
            {currencyFormat(values.totalPayment)}
          </Text>
        </StyledTotalPayment>
      </Stack>
    </Stack>
  );
};
const renderPaymentMethodVerification = () => <></>;

const renderCommentsVerification = (values: ICommentsEntry) => (
  <Stack width="100%" direction="column">
    {values.comments !== "" && (
      <BoxAttribute
        label="Comentarios adicionales:"
        value={values.comments}
        direction="column"
      />
    )}
  </Stack>
);

interface VerificationBoxesProps {
  pay: IFormsPay;
  stepKey: string;
  isTablet: boolean;
}

function VerificationBoxes(props: VerificationBoxesProps) {
  const { pay, stepKey, isTablet } = props;
  return (
    <>
      {stepKey === "obligations" &&
        renderObligationsVerification(pay.obligations.values, isTablet)}

      {stepKey === "paymentMethod" && renderPaymentMethodVerification()}

      {stepKey === "comments" &&
        renderCommentsVerification(pay.comments.values)}
    </>
  );
}

export { VerificationBoxes };
