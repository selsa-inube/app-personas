import { Icon } from "@design/data/Icon";
import { Text } from "@design/data/Text";
import { Stack } from "@design/layout/Stack";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { getRecordDescriptionType } from "@pages/admin/cards/Card/config/product";
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
import { SkeletonLine } from "@inube/design-system";

const getIconForRecordType = (type: EMovementType) => {
  return (
    <Stack direction="column" justifyContent="center">
      {(type === EMovementType.PURCHASE || type === EMovementType.DEBIT) && (
        <Icon
          icon={<MdArrowBack />}
          appearance="danger"
          spacing="none"
          size="16px"
          variant="outlined"
          shape="circle"
        />
      )}
      {type === EMovementType.REVERSE && (
        <Icon
          icon={<MdOutlineCached />}
          appearance="success"
          spacing="none"
          size="16px"
          variant="outlined"
          shape="circle"
        />
      )}
      {(type === EMovementType.PAYMENT || type === EMovementType.CREDIT) && (
        <Icon
          icon={<MdOutlineCheck />}
          appearance="success"
          spacing="none"
          size="16px"
          variant="outlined"
          shape="circle"
        />
      )}
      {type === EMovementType.RECORD && (
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
  id: string;
  type: EMovementType;
  description: string;
  totalValue: number;
  withExpandingIcon?: boolean;
  tag?: TagProps;
  loading?: boolean;
  attributes: { id: string; label: string; value: number | string | Date }[];
  onClick?: (movementId: string) => void;
}

function RecordCard(props: RecordCardProps) {
  const {
    id,
    type,
    description,
    totalValue,
    attributes,
    withExpandingIcon = false,
    loading,
    onClick,
    tag,
  } = props;

  const isMobile = useMediaQuery("(max-width: 580px)");

  const formattedValue =
    type === EMovementType.PURCHASE ||
    type === EMovementType.CREDIT ||
    type === EMovementType.RECORD
      ? currencyFormat(totalValue)
      : `-${currencyFormat(totalValue)}`;

  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  return (
    <Stack direction="column" gap="s100">
      <Stack justifyContent="space-between" gap={isMobile ? "s150" : "s500"}>
        {loading ? (
          <>
            <Stack gap="s150">
              <SkeletonLine animated width="16px" />
              <SkeletonLine animated width={isMobile ? "232px" : "582px"} />
            </Stack>
            <Stack gap="s150">
              {!isMobile && <SkeletonLine animated width="80px" />}
              <SkeletonLine animated width="16px" />
            </Stack>
          </>
        ) : (
          <>
            <Stack gap="s150">
              {getIconForRecordType(type)}
              <Text type="label" size="medium">
                {`${getRecordDescriptionType(type, description)} ${description}`}
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
                  onClick={handleClick}
                  cursorHover
                />
              )}
            </Stack>
          </>
        )}
      </Stack>
      <Stack direction="column" gap="s050">
        {loading ? (
          <>
            <SkeletonLine animated width="150px" />
            <SkeletonLine animated width="150px" />
            <SkeletonLine animated width="150px" />
          </>
        ) : (
          attributes.map((attribute, index) => (
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
          ))
        )}
      </Stack>
      {isMobile && (
        <Stack justifyContent="flex-end">
          {loading ? (
            <SkeletonLine animated width="80px" />
          ) : (
            <Text type="label" size="medium">
              {formattedValue}
            </Text>
          )}
        </Stack>
      )}
    </Stack>
  );
}

export { RecordCard };
export type { RecordCardProps };
