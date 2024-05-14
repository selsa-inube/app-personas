import { OutlineCard } from "@components/cards/OutlineCard";
import { Icon } from "@design/data/Icon";
import { Text } from "@design/data/Text";
import { Button } from "@design/input/Button";
import { Stack } from "@design/layout/Stack";
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
        width="100"
        alignItems="center"
      >
        <Icon
          icon={<MdSearch />}
          appearance="gray"
          size="40px"
          spacing="none"
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
