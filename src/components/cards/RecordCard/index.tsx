import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import {
  Button,
  Icon,
  ITag,
  SkeletonLine,
  Stack,
  Tag,
  Text,
} from "@inubekit/inubekit";
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
import { formatPrimaryTimestamp } from "src/utils/dates";

const getIconForRecordType = (type: EMovementType) => {
  return (
    <Stack direction="column" justifyContent="center">
      {(type === EMovementType.PURCHASE || type === EMovementType.DEBIT) && (
        <Icon
          icon={<MdArrowBack />}
          appearance="danger"
          spacing="narrow"
          size="16px"
          variant="outlined"
          shape="circle"
        />
      )}
      {type === EMovementType.REVERSE && (
        <Icon
          icon={<MdOutlineCached />}
          appearance="success"
          spacing="narrow"
          size="16px"
          variant="outlined"
          shape="circle"
        />
      )}
      {(type === EMovementType.PAYMENT || type === EMovementType.CREDIT) && (
        <Icon
          icon={<MdOutlineCheck />}
          appearance="success"
          spacing="narrow"
          size="16px"
          variant="outlined"
          shape="circle"
        />
      )}
      {(type === EMovementType.RECORD || type === EMovementType.PQRS) && (
        <Icon
          icon={<MdOutlineAssignment />}
          appearance="gray"
          spacing="narrow"
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
  value?: number;
  label?: string;
  withExpandingIcon?: boolean;
  tag?: ITag;
  loading?: boolean;
  attributes: { id: string; label: string; value: number | string | Date }[];
  datesWithTime?: boolean;
  onClick?: (movementId: string) => void;
}

function RecordCard(props: RecordCardProps) {
  const {
    id,
    type,
    description,
    value,
    label,
    attributes,
    withExpandingIcon = false,
    loading,
    tag,
    datesWithTime,
    onClick,
  } = props;

  const isMobile = useMediaQuery("(max-width: 580px)");

  const formattedValue =
    value !== undefined
      ? type === EMovementType.PURCHASE ||
        type === EMovementType.CREDIT ||
        type === EMovementType.RECORD
        ? currencyFormat(value)
        : `-${currencyFormat(value)}`
      : null;

  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  return (
    <Stack direction="column" gap={inube.spacing.s100}>
      <Stack
        justifyContent="space-between"
        gap={isMobile ? inube.spacing.s150 : inube.spacing.s500}
      >
        {loading ? (
          <>
            <Stack gap={inube.spacing.s150}>
              <SkeletonLine animated width="16px" />
              <SkeletonLine animated width={isMobile ? "232px" : "582px"} />
            </Stack>
            <Stack gap={inube.spacing.s150}>
              {!isMobile && <SkeletonLine animated width="80px" />}
              <SkeletonLine animated width="16px" />
            </Stack>
          </>
        ) : (
          <>
            <Stack wrap="wrap" gap={inube.spacing.s100} direction="column">
              <Stack gap={inube.spacing.s100} alignItems="center">
                {getIconForRecordType(type)}

                <Stack gap={inube.spacing.s150}>
                  <Text type="label" size="medium" weight="bold">
                    {`${getRecordDescriptionType(type, description)} ${description}`}
                  </Text>
                </Stack>
              </Stack>

              {tag && (
                <Stack>
                  <Tag label={tag.label} appearance={tag.appearance} />
                </Stack>
              )}
            </Stack>

            <Stack gap={inube.spacing.s150}>
              <Text type="label" size="medium" ellipsis weight="bold">
                {formattedValue || label}
              </Text>

              {withExpandingIcon && !isMobile && !EMovementType.PQRS && (
                <Icon
                  icon={<MdOpenInNew />}
                  appearance="primary"
                  spacing="narrow"
                  size="16px"
                  onClick={handleClick}
                  cursorHover
                />
              )}
            </Stack>
          </>
        )}
      </Stack>
      <Stack direction="column" gap={inube.spacing.s050}>
        {loading ? (
          <>
            <SkeletonLine animated width="150px" />
            <SkeletonLine animated width="150px" />
            <SkeletonLine animated width="150px" />
          </>
        ) : (
          attributes.map(
            (attribute, index) =>
              attribute.value && (
                <Stack key={attribute.id} justifyContent="space-between">
                  <Stack gap={inube.spacing.s075}>
                    <Text type="label" size="medium" appearance="gray">
                      {attribute.label}:
                    </Text>
                    <Text type="body" size="small">
                      {attribute.value instanceof Date
                        ? formatPrimaryTimestamp(attribute.value, datesWithTime)
                        : attribute.value}
                    </Text>
                  </Stack>

                  {withExpandingIcon &&
                    !isMobile &&
                    index === attributes.length - 1 && (
                      <Stack justifyContent="flex-end">
                        {loading ? (
                          <SkeletonLine animated width="80px" />
                        ) : (
                          <Button
                            variant="none"
                            spacing="compact"
                            onClick={handleClick}
                          >
                            Ver detalles
                          </Button>
                        )}
                      </Stack>
                    )}
                </Stack>
              ),
          )
        )}
      </Stack>
      {isMobile && withExpandingIcon && (
        <Stack justifyContent="flex-end">
          {loading ? (
            <SkeletonLine animated width="80px" />
          ) : (
            <Button variant="none" spacing="compact" onClick={handleClick}>
              Ver detalles
            </Button>
          )}
        </Stack>
      )}
    </Stack>
  );
}

export { RecordCard };
export type { RecordCardProps };
