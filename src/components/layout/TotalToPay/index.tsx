import { Text } from "@design/data/Text";
import { Icon } from "@design/data/Icon";
import { MdOpenInNew } from "react-icons/md";
import { currencyFormat } from "src/utils/currency";
import { StyledTotalPayment, StyledTagValue } from "./styles";

interface TotalToPayProps {
  isMobile: boolean;
  isExpandable?: boolean;
  isdisabled?: boolean;
  value: number;
  onclick?: () => void;
}

function TotalToPay(props: TotalToPayProps) {
  const {
    isMobile,
    isExpandable = false,
    isdisabled = false,
    value,
    onclick,
  } = props;

  return (
    <StyledTotalPayment isMobile={isMobile}>
      <Text type="title" size="medium">
        Total a pagar hoy:
      </Text>
      <StyledTagValue isExpandable={isExpandable}>
        {isExpandable && (
          <Icon
            icon={<MdOpenInNew />}
            appearance="primary"
            size="16px"
            spacing="none"
            cursorHover
            disabled={isdisabled}
            onClick={onclick}
          />
        )}
        <Text type="title" size="medium" appearance="gray">
          {currencyFormat(value)}
        </Text>
      </StyledTagValue>
    </StyledTotalPayment>
  );
}

export { TotalToPay };
