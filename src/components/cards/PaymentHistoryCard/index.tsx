import { Icon } from "@design/data/Icon";
import { Tag, TagProps } from "@design/data/Tag";
import { Text } from "@design/data/Text";
import { Stack } from "@design/layout/Stack";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { MdOpenInNew, MdOutlinePayments } from "react-icons/md";
import { currencyFormat } from "src/utils/currency";
import { formatPrimaryDate } from "src/utils/dates";
import { StyledCard } from "./styles";

interface PaymentHistoryCardProps {
  id: string;
  title: string;
  tag: TagProps;
  value: number;
  paymentDate: Date;
  paymentMethod: string;
  cus: string;
  onClick: () => void;
}

function PaymentHistoryCard(props: PaymentHistoryCardProps) {
  const { title, tag, value, paymentDate, paymentMethod, cus, onClick } = props;
  const isMobile = useMediaQuery("(max-width: 580px)");

  return (
    <StyledCard>
      <Stack direction="column" gap="s200" width="100%">
        <Stack justifyContent="space-between" alignItems="center">
          <Stack gap="s100">
            <Icon
              icon={<MdOutlinePayments />}
              appearance="gray"
              size="16px"
              spacing="none"
              cursorHover
            />
            <Text type="label" size={isMobile ? "small" : "medium"}>
              {title}
            </Text>
            {!isMobile && (
              <Tag
                label={tag.label}
                appearance={tag.appearance}
                textAppearance={tag.textAppearance}
                modifier={tag.modifier}
              />
            )}
          </Stack>
          <Stack gap="s200" alignItems="center">
            {!isMobile && (
              <Text type="label" size="medium">
                {currencyFormat(value)}
              </Text>
            )}
            <Icon
              icon={<MdOpenInNew />}
              spacing="none"
              size="16px"
              onClick={onClick}
              cursorHover
            />
          </Stack>
        </Stack>
        <Stack direction="column" gap="s050">
          <Stack justifyContent="space-between">
            <Stack gap="s075">
              <Text
                type="label"
                size={isMobile ? "small" : "medium"}
                appearance="gray"
              >
                Fecha:
              </Text>
              <Text type="body" size="small">
                {formatPrimaryDate(paymentDate, true)}
              </Text>
            </Stack>
            {isMobile && (
              <Tag
                label={tag.label}
                appearance={tag.appearance}
                textAppearance={tag.textAppearance}
                modifier={tag.modifier}
              />
            )}
          </Stack>
          <Stack gap="s075" wrap="wrap">
            <Text
              type="label"
              size={isMobile ? "small" : "medium"}
              appearance="gray"
            >
              Forma de pago:
            </Text>
            <Text type="body" size="small">
              {paymentMethod}
            </Text>
          </Stack>
          <Stack justifyContent="space-between">
            <Stack gap="s075">
              <Text
                type="label"
                size={isMobile ? "small" : "medium"}
                appearance="gray"
              >
                CUS:
              </Text>
              <Text type="body" size="small">
                {cus}
              </Text>
            </Stack>
            {isMobile && (
              <Text type="label" size="small">
                {currencyFormat(value)}
              </Text>
            )}
          </Stack>
        </Stack>
      </Stack>
    </StyledCard>
  );
}

export { PaymentHistoryCard };
export type { PaymentHistoryCardProps };
