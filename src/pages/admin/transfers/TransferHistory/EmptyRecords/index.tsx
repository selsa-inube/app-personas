import { OutlineCard } from "@components/cards/OutlineCard";
import { Icon } from "@design/data/Icon";
import { Text } from "@design/data/Text";
import { Stack } from "@design/layout/Stack";
import { MdSearch } from "react-icons/md";

function EmptyRecords() {
  return (
    <OutlineCard>
      <Stack
        direction="column"
        padding="s250"
        gap="s250"
        alignItems="center"
        width="100%"
        justifyContent="center"
      >
        <Icon
          icon={<MdSearch />}
          appearance="gray"
          size="40px"
          spacing="none"
        />
        <Text type="title" size="medium">
          Sin registros
        </Text>
        <Text type="body" size="medium" appearance="gray">
          Aun no has realizado transferencias.
        </Text>
      </Stack>
    </OutlineCard>
  );
}

export { EmptyRecords };
