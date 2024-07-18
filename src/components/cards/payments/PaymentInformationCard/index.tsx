import { Text } from "@design/data/Text";
import { MdOutlineDelete } from "react-icons/md";
import { StyledCard } from "./styles";
import { Stack } from "@design/layout/Stack";
import { currencyFormat } from "src/utils/currency";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Icon } from "@inubekit/icon";

interface PaymentInformationCardProps {
  id: string;
  title: string;
  description?: string;
  value: number;
  removePaymentCard: (paymentId: string, paymentValue: number) => void;
}

function PaymentInformationCard(props: PaymentInformationCardProps) {
  const { id, title, description, value, removePaymentCard } = props;
  const isMobile = useMediaQuery("(max-width: 580px)");

  return (
    <StyledCard $smallScreen={isMobile} key={id}>
      <Stack direction="column">
        <Stack
          justifyContent="space-between"
          alignContent="center"
          alignItems="center"
        >
          <Text type="label" size={isMobile ? "small" : "large"}>
            {title}
          </Text>
          <Icon
            icon={<MdOutlineDelete />}
            appearance="danger"
            size="20px"
            spacing="narrow"
            onClick={() => removePaymentCard(id, value)}
            cursorHover
          />
        </Stack>
      </Stack>
      <Stack direction="column">
        <Stack justifyContent="space-between" alignItems="center">
          <Text
            type="body"
            appearance="gray"
            size={isMobile ? "small" : "medium"}
          >
            {description}
          </Text>
          <Text type="body" size={isMobile ? "small" : "medium"}>
            {currencyFormat(value)}
          </Text>
        </Stack>
      </Stack>
    </StyledCard>
  );
}

export { PaymentInformationCard };
export type { PaymentInformationCardProps };
