import { Avatar, Stack, Text } from "@inubekit/inubekit";
import { StyledUser } from "./styles";

interface UserProps {
  username: string;
  businessUnit?: string;
  onlyAvatar?: boolean;
  onClick?: () => void;
}

function User(props: UserProps) {
  const { username, businessUnit, onlyAvatar, onClick } = props;

  return (
    <StyledUser onClick={onClick} $onlyAvatar={onlyAvatar}>
      {!onlyAvatar && (
        <Stack direction="column" justifyContent="center">
          <Text type="label" size="medium" textAlign="center">
            {username}
          </Text>
          {businessUnit && (
            <Text type="body" size="small" appearance="gray" textAlign="center">
              {businessUnit}
            </Text>
          )}
        </Stack>
      )}
      <Avatar />
    </StyledUser>
  );
}

export { User };
export type { UserProps };
