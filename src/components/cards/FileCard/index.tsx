import { MdDeleteOutline, MdOutlineDescription } from "react-icons/md";
import { truncateFileName } from "src/utils/texts";
import { OutlineCard } from "../OutlineCard";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { inube } from "@design/tokens";

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
      <Stack
        padding={inube.spacing.s200}
        gap={inube.spacing.s150}
        alignItems="center"
        width="100%"
      >
        <Icon
          icon={<MdOutlineDescription />}
          appearance="dark"
          size="24px"
          spacing="narrow"
          cursorHover
        />

        <Stack direction="column" gap={inube.spacing.s050} width="100%">
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
              appearance="danger"
              size="16px"
              spacing="narrow"
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
