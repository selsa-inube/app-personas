import { Stack } from "@design/layout/Stack";
import { Text } from "@design/data/Text";
import { Avatar } from "@design/data/Avatar";
import { inube } from "@design/tokens";

interface MenuUserProps {
  userName: string;
  businessUnit?: string;
  avatar?: boolean;
}

function MenuUser(props: MenuUserProps) {
  const { userName, businessUnit, avatar = true } = props;

  return (
    <Stack gap="s150" padding={`${inube.spacing.s150} ${inube.spacing.s200}`}>
      {avatar && (
        <Stack direction="column" justifyContent="center">
          <Avatar />
        </Stack>
      )}
      <Stack direction="column" justifyContent="center">
        <Text type="body" size="medium">
          {userName}
        </Text>
        <Text type="body" size="small" appearance="gray">
          {businessUnit}
        </Text>
      </Stack>
    </Stack>
  );
}

export type { MenuUserProps };
export { MenuUser };
