import { OutlineCard } from "@components/cards/OutlineCard";
import { inube } from "@design/tokens";
import { Button } from "@inubekit/button";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { MdSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function EmptyRecords() {
  const navigate = useNavigate();

  const goToPayment = () => {
    navigate("/payments/pay");
  };
  return (
    <OutlineCard>
      <Stack
        direction="column"
        padding={inube.spacing.s250}
        gap={inube.spacing.s250}
        alignItems="center"
        width="100%"
        justifyContent="center"
      >
        <Icon
          icon={<MdSearch />}
          appearance="gray"
          size="40px"
          spacing="narrow"
        />
        <Text type="title" size="medium">
          Sin registros
        </Text>
        <Text type="body" size="medium" appearance="gray">
          Aun no has realizado pagos, haz clic en el botón para empezar.
        </Text>
        <Button onClick={goToPayment} spacing="compact">
          Pagar
        </Button>
      </Stack>
    </OutlineCard>
  );
}

export { EmptyRecords };
