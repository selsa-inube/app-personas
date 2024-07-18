import { OutlineCard } from "@components/cards/OutlineCard";
import { Text } from "@design/data/Text";
import { Button } from "@design/input/Button";
import { Stack } from "@design/layout/Stack";
import { Icon } from "@inubekit/icon";
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
        padding="s250"
        gap="s250"
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
