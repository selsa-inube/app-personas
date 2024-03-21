import { Icon } from "@design/data/Icon";
import { Stack } from "@design/layout/Stack";
import { Text } from "@design/data/Text";
import {
  MdArrowBack,
  MdOpenInNew,
  MdOutlineCached,
  MdOutlineCheck,
} from "react-icons/md";
import { currencyFormat } from "src/utils/currency";
import { formatPrimaryDate } from "src/utils/dates";
import { EMovementType } from "src/model/entity/product";
import { getMovementDescriptionType } from "@pages/admin/cards/Card/config/product";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { StyledCard } from "./styles";

interface CardMovementProps {
  movementType: EMovementType;
  description: string;
  totalValue: number;
  date: Date;
  quotas?: string;
  onClick?: () => void;
}

function CardMovement(props: CardMovementProps) {
  const { movementType, description, totalValue, date, quotas, onClick } =
    props;

  const isMobile = useMediaQuery("(max-width: 580px)");

  return (
    <StyledCard smallScreen={isMobile}>
      <Stack justifyContent="space-between" gap="s100">
        <Stack gap="s100">
          <Stack direction="column">
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
            <Text type="label" size={isMobile ? "small" : "medium"}>
              {`${getMovementDescriptionType(movementType)} ${description}`}
            </Text>
          </Stack>
        </Stack>
        {!isMobile ? (
          <Text type="label" size="medium">
            {currencyFormat(totalValue)}
          </Text>
        ) : (
          <Stack alignItems="center">
            <Icon
              icon={<MdOpenInNew />}
              spacing="none"
              size="16px"
              onClick={onClick}
              cursorHover
            />
          </Stack>
        )}
      </Stack>
      <Stack justifyContent="space-between">
        <Text
          type="label"
          size={isMobile ? "small" : "medium"}
          appearance="gray"
        >
          {formatPrimaryDate(date, true)}
        </Text>
        {quotas && (
          <Text
            type="label"
            size={isMobile ? "small" : "medium"}
            appearance="gray"
          >
            {quotas}
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

export type { CardMovementProps };
export { CardMovement };
