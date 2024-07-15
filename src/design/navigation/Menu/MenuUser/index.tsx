import { Stack } from "@design/layout/Stack";
import { Text } from "@design/data/Text";
import { Avatar } from "@inubekit/avatar";
import { StyledUser } from "./styles";

interface MenuUserProps {
  userName: string;
  businessUnit?: string;
  avatar?: boolean;
}

function MenuUser(props: MenuUserProps) {
  const { userName, businessUnit, avatar = true } = props;

  return (
    <StyledUser>
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
    </StyledUser>
  );
}

export type { MenuUserProps };
export { MenuUser };
