import { OutlineCard } from "@components/cards/OutlineCard";
import { Text } from "@design/data/Text";
import { Stack } from "@design/layout/Stack";
import { Icon } from "@inubekit/icon";
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
          spacing="narrow"
        />
        <Text type="title" size="medium">
          Sin registros
        </Text>
        <Text type="body" size="medium" appearance="gray">
          Aun no has realizado ninguna solicitud.
        </Text>
      </Stack>
    </OutlineCard>
  );
}

export { EmptyRecords };
