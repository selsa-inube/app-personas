import { inube } from "@design/tokens";
import { Icon } from "@inubekit/icon";
import { Spinner } from "@inubekit/spinner";
import { Stack } from "@inubekit/stack";
import { MdDeleteOutline, MdOutlineDescription } from "react-icons/md";
import { truncateFileName } from "src/utils/texts";
import { OutlineCard } from "../OutlineCard";

import { Text } from "@inubekit/text";

interface FileCardProps {
  id: string;
  name: string;
  size: number;
  loading?: boolean;
  onRemove?: (id: string) => void;
}

function FileCard(props: FileCardProps) {
  const { id, name, size, loading, onRemove } = props;

  const kilobytes = (size / 1024).toFixed(2);

  return (
    <OutlineCard>
      <Stack
        padding={inube.spacing.s150}
        gap={inube.spacing.s100}
        alignItems="center"
        width="100%"
      >
        <Icon
          icon={<MdOutlineDescription />}
          appearance="dark"
          size="20px"
          spacing="narrow"
          cursorHover
        />

        <Stack justifyContent="space-between" width="100%" alignItems="center">
          <Stack direction="column" gap={inube.spacing.s050} width="100%">
            <Text type="label" size="medium">
              {truncateFileName(name, 20)}
            </Text>

            <Text type="body" size="small" appearance="gray">
              {kilobytes} KB
            </Text>
          </Stack>

          {loading ? (
            <Spinner size="small" appearance="primary" transparent />
          ) : (
            onRemove && (
              <Icon
                icon={<MdDeleteOutline />}
                appearance="danger"
                size="20px"
                spacing="narrow"
                cursorHover
                onClick={() => onRemove(id)}
              />
            )
          )}
        </Stack>
      </Stack>
    </OutlineCard>
  );
}

export { FileCard };
export type { FileCardProps };
