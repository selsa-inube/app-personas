import { Text } from "@design/data/Text";
import { Stack } from "@design/layout/Stack";

import { Divider } from "@design/layout/Divider";
import { IAttribute } from "src/model/entity/product";
import { currencyFormat } from "src/utils/currency";
import { StyledQuotaDetailBox } from "./styles";

interface QuotaDetailBoxProps {
  title: string;
  paymentItems: IAttribute[];
  totalPayment: number;
}

function QuotaDetailBox(props: QuotaDetailBoxProps) {
  const { title, paymentItems, totalPayment } = props;

  return (
    <StyledQuotaDetailBox>
      <Stack direction="column" gap="s250">
        <Text type="title" size="small">
          {title}
        </Text>
        <Stack direction="column" gap="s150">
          {paymentItems.map((item, index) => (
            <Stack key={index} justifyContent="space-between">
              <Text type="label" size="medium">
                {item.label}:
              </Text>
              <Text type="body" size="small" appearance="gray">
                {currencyFormat(Number(item.value))}
              </Text>
            </Stack>
          ))}
        </Stack>
        <Divider />
        <Stack justifyContent="space-between">
          <Text type="title" size="medium" appearance="gray">
            Total:
          </Text>
          <Text type="title" size="medium">
            {currencyFormat(totalPayment)}
          </Text>
        </Stack>
      </Stack>
    </StyledQuotaDetailBox>
  );
}

export { QuotaDetailBox };
export type { QuotaDetailBoxProps };
