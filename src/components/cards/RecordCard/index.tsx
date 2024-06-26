import { Icon } from "@design/data/Icon";
import { Text } from "@design/data/Text";
import { Stack } from "@design/layout/Stack";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { getMovementDescriptionType } from "@pages/admin/cards/Card/config/product";
import {
  MdArrowBack,
  MdOpenInNew,
  MdOutlineAssignment,
  MdOutlineCached,
  MdOutlineCheck,
} from "react-icons/md";
import { EMovementType } from "src/model/entity/product";
import { currencyFormat } from "src/utils/currency";
import { Tag, TagProps } from "@design/data/Tag";
import { formatPrimaryDate } from "src/utils/dates";

const getIconForMovementType = (movementType: EMovementType) => {
  return (
    <Stack direction="column" justifyContent="center">
      {(movementType === EMovementType.PURCHASE ||
        movementType === EMovementType.DEBIT) && (
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
      {(movementType === EMovementType.PAYMENT ||
        movementType === EMovementType.CREDIT) && (
        <Icon
          icon={<MdOutlineCheck />}
          appearance="success"
          spacing="none"
          size="16px"
          variant="outlined"
          shape="circle"
        />
      )}
      {movementType === EMovementType.RECORD && (
        <Icon
          icon={<MdOutlineAssignment />}
          appearance="gray"
          spacing="none"
          size="16px"
        />
      )}
    </Stack>
  );
};

interface RecordCardProps {
  movementType: EMovementType;
  description: string;
  totalValue: number;
  withExpandingIcon?: boolean;
  tag?: TagProps;
  attributes: { id: string; label: string; value: number | string | Date }[];
  onClick?: () => void;
}

function RecordCard(props: RecordCardProps) {
  const {
    movementType,
    description,
    totalValue,
    attributes,
    withExpandingIcon = false,
    onClick,
    tag,
  } = props;

  const isMobile = useMediaQuery("(max-width: 580px)");

  const formattedValue =
    movementType === EMovementType.PURCHASE ||
    movementType === EMovementType.CREDIT ||
    movementType === EMovementType.RECORD
      ? currencyFormat(totalValue)
      : `-${currencyFormat(totalValue)}`;

  return (
    <Stack direction="column" gap="s100">
      <Stack justifyContent="space-between" gap={isMobile ? "s150" : "s500"}>
        <Stack gap="s150">
          {getIconForMovementType(movementType)}
          <Text type="label" size="medium">
            {`${getMovementDescriptionType(movementType, description)} ${description}`}
          </Text>
          {tag && !isMobile && (
            <Tag
              label={tag.label}
              appearance={tag.appearance}
              textAppearance={tag.textAppearance}
              modifier={tag.modifier}
            />
          )}
        </Stack>
        <Stack gap="s150">
          {!isMobile && (
            <Text type="label" size="medium">
              {formattedValue}
            </Text>
          )}
          {withExpandingIcon && (
            <Icon
              icon={<MdOpenInNew />}
              spacing="none"
              size="16px"
              onClick={onClick}
              cursorHover
            />
          )}
        </Stack>
      </Stack>
      <Stack direction="column" gap="s050">
        {attributes.map((attribute, index) => (
          <Stack key={attribute.id} justifyContent="space-between">
            <Stack gap="s075">
              <Text type="label" size="medium" appearance="gray">
                {attribute.label}:
              </Text>
              <Text type="body" size="small">
                {attribute.value instanceof Date
                  ? formatPrimaryDate(attribute.value)
                  : attribute.value}
              </Text>
            </Stack>
            {index === 0 && tag && isMobile && (
              <Tag
                label={tag.label}
                appearance={tag.appearance}
                textAppearance={tag.textAppearance}
                modifier={tag.modifier}
              />
            )}
          </Stack>
        ))}
      </Stack>
      {isMobile && (
        <Stack justifyContent="flex-end">
          <Text type="label" size="medium">
            {formattedValue}
          </Text>
        </Stack>
      )}
    </Stack>
  );
}

export { RecordCard };
export type { RecordCardProps };
