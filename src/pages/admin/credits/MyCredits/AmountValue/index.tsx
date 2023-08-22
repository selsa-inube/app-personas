import { Text } from "@design/data/Text";

const getPriceFormat = (price: number): string => {
  return price.toLocaleString("es-CO", {
    currency: "COP",
  });
};

interface AmountValueProps {
  value: number;
}

function AmountValue(props: AmountValueProps) {
  const { value } = props;

  return (
    <Text type="body" size="small" appearance="dark">
      ${getPriceFormat(value)}
    </Text>
  );
}

export { AmountValue };
