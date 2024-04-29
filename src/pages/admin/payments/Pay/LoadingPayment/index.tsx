import { Text } from "@design/data/Text";
import { Spinner } from "@design/feedback/Spinner";
import { Blanket } from "@design/layout/Blanket";
import { StyledLoadingCard } from "./styles";

function LoadingPayment() {
  return (
    <Blanket>
      <StyledLoadingCard>
        <Spinner size="large" />
        <Text type="title" size="large">
          Procesando pago...
        </Text>
        <Text type="body" size="large" appearance="gray" textAlign="center">
          Espera unos segundos, estamos procesando la transacción.
        </Text>
      </StyledLoadingCard>
    </Blanket>
  );
}

export { LoadingPayment };
