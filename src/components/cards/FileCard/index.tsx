import { Icon } from "@design/data/Icon";
import { Text } from "@design/data/Text";
import { Stack } from "@design/layout/Stack";
import { MdDeleteOutline, MdOutlineDescription } from "react-icons/md";
import { truncateFileName } from "src/utils/texts";
import { OutlineCard } from "../OutlineCard";

interface FileCardProps {
  id: string;
  name: string;
  size: number;
  onRemove: (id: string) => void;
}

function FileCard(props: FileCardProps) {
  const { id, name, size, onRemove } = props;

  const kilobytes = (size / 1024).toFixed(2);

  return (
    <OutlineCard>
      <Stack padding="s200" gap="s150" alignItems="center" width="100%">
        <Icon
          icon={<MdOutlineDescription />}
          appearance="dark"
          size="24px"
          spacing="none"
          cursorHover
        />

        <Stack direction="column" gap="s050" width="100%">
          <Stack
            justifyContent="space-between"
            width="100%"
            alignItems="center"
          >
            <Text type="label" size="medium">
              {truncateFileName(name, 10)}
            </Text>

            <Icon
              icon={<MdDeleteOutline />}
              appearance="error"
              size="16px"
              spacing="none"
              cursorHover
              onClick={() => onRemove(id)}
            />
          </Stack>
          <Text type="body" size="small" appearance="gray">
            {kilobytes} KB
          </Text>
        </Stack>
      </Stack>
    </OutlineCard>
  );
}

export { FileCard };
export type { FileCardProps };
