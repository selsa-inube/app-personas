import { Icon } from "@design/data/Icon";
import { Tag, TagProps } from "@design/data/Tag";
import { Text } from "@design/data/Text";
import { Stack } from "@design/layout/Stack";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { MdOutlinePayments } from "react-icons/md";
import { currencyFormat } from "src/utils/currency";
import { formatPrimaryDate } from "src/utils/dates";
import { StyledCard } from "./styles";

interface TransferHistoryCardProps {
  id: string;
  title: string;
  destination: string;
  value: number;
  source: string;
  date: Date;
  tag: TagProps;
}

function TransferHistoryCard(props: TransferHistoryCardProps) {
  const { title, value, date, destination, source, tag } = props;

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
                Destino:
              </Text>
              <Text type="body" size="small">
                {destination}
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
              Origen:
            </Text>
            <Text type="body" size="small">
              {source}
            </Text>
          </Stack>
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
                {formatPrimaryDate(date, true)}
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

export { TransferHistoryCard };
export type { TransferHistoryCardProps };
