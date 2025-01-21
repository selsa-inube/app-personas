import { Icon } from "@inubekit/inubekit";
import { Text } from "@inubekit/text";
import { MdOpenInNew } from "react-icons/md";
import { currencyFormat } from "src/utils/currency";
import { StyledTagValue, StyledTotalPayment } from "./styles";

interface TotalizerProps {
  isMobile: boolean;
  isExpandable?: boolean;
  isDisabled?: boolean;
  value: number;
  onClick?: () => void;
}

function Totalizer(props: TotalizerProps) {
  const {
    isMobile,
    isExpandable = false,
    isDisabled = false,
    value,
    onClick,
  } = props;

  return (
    <StyledTotalPayment $isMobile={isMobile} onClick={onClick}>
      <Text type="title" size="medium" weight="bold">
        Total a pagar hoy:
      </Text>
      <StyledTagValue $isExpandable={isExpandable}>
        {isExpandable && (
          <Icon
            icon={<MdOpenInNew />}
            appearance="primary"
            size="16px"
            spacing="narrow"
            cursorHover
            disabled={isDisabled}
          />
        )}
        <Text type="title" size="medium" appearance="gray">
          {currencyFormat(value)}
        </Text>
      </StyledTagValue>
    </StyledTotalPayment>
  );
}

export { Totalizer };
