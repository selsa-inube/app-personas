import { Icon } from "@design/data/Icon";
import { Text } from "@design/data/Text";
import { Stack } from "@design/layout/Stack";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { getMovementDescriptionType } from "@pages/admin/cards/Card/config/product";
import {
  MdArrowBack,
  MdOpenInNew,
  MdOutlineCached,
  MdOutlineCheck,
} from "react-icons/md";
import { EMovementType } from "src/model/entity/product";
import { currencyFormat } from "src/utils/currency";
import { formatPrimaryDate } from "src/utils/dates";
import { StyledCard } from "./styles";

interface CardMovementProps {
  movementType: EMovementType;
  description: string;
  totalValue: number;
  date: Date;
  reference?: string;
  onClick?: () => void;
}

function CardMovement(props: CardMovementProps) {
  const { movementType, description, totalValue, date, reference, onClick } =
    props;

  const isMobile = useMediaQuery("(max-width: 580px)");

  return (
    <StyledCard smallScreen={isMobile}>
      <Stack justifyContent="space-between" gap={isMobile ? "s200" : "s500"}>
        <Stack gap="s150">
          <Stack direction="column" justifyContent="center">
            {movementType === EMovementType.PURCHASE && (
              <Icon
                icon={<MdArrowBack />}
                appearance="error"
                spacing="none"
                size="16px"
                variant="outlined"
                shape="circle"
              />
            )}
            {movementType === EMovementType.REVERSE && (
              <Icon
                icon={<MdOutlineCached />}
                appearance="success"
                spacing="none"
                size="16px"
                variant="outlined"
                shape="circle"
              />
            )}
            {movementType === EMovementType.PAYMENT && (
              <Icon
                icon={<MdOutlineCheck />}
                appearance="success"
                spacing="none"
                size="16px"
                variant="outlined"
                shape="circle"
              />
            )}
          </Stack>
          <Stack alignItems="center">
            <Text type="label" size="medium">
              {`${getMovementDescriptionType(movementType, description)} ${description}`}
            </Text>
          </Stack>
        </Stack>
        {!isMobile ? (
          <Text type="label" size="medium">
            {currencyFormat(totalValue)}
          </Text>
        ) : (
          <Icon
            icon={<MdOpenInNew />}
            spacing="none"
            size="16px"
            onClick={onClick}
            cursorHover
          />
        )}
      </Stack>
      <Stack justifyContent="space-between">
        <Text type="body" size="small" appearance="gray">
          {formatPrimaryDate(date, false)}
          {reference && !isMobile && ` - ${reference}`}
        </Text>
        {reference && isMobile && (
          <Text type="body" size="small" appearance="gray">
            {reference}
          </Text>
        )}
      </Stack>
      {isMobile && (
        <Stack justifyContent="flex-end">
          <Text type="label" size="small">
            {currencyFormat(totalValue)}
          </Text>
        </Stack>
      )}
    </StyledCard>
  );
}

export { CardMovement };
export type { CardMovementProps };
