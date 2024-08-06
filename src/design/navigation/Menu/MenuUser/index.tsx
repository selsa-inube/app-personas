import { Avatar } from "@inubekit/avatar";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
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
        <Stack direction="column" justifyContent="center" alignItems="center">
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

export { MenuUser };
export type { MenuUserProps };
