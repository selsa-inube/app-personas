import { IEntry } from "@design/data/Table/types";
import { Text } from "@design/data/Text";

const getPriceFormat = (price: number): string => {
  return price.toLocaleString("es-CO", {
    currency: "COP",
  });
};

interface MovementValueProps {
  movement: IEntry;
}

function MovementValue(props: MovementValueProps) {
  const { movement } = props;

  return (
    <Text type="body" size="small" appearance="dark">
      ${getPriceFormat(movement.capitalPayment)}
    </Text>
  );
}

export { MovementValue };
