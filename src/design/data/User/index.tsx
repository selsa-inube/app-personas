import { Stack } from "../../layout/Stack";
import { Avatar } from "../Avatar";
import { Text } from "../Text";
import { StyledUser } from "./styles";

interface UserProps {
  username: string;
  client?: string;
}

function User(props: UserProps) {
  const { username, client } = props;

  return (
    <StyledUser>
      <Stack gap="16px">
        <Stack direction="column" justifyContent="center">
          <Text type="label" size="medium" textAlign="center">
            {username}
          </Text>
          {client && (
            <Text type="body" size="small" appearance="gray" textAlign="center">
              {client}
            </Text>
          )}
        </Stack>
        <Avatar />
      </Stack>
    </StyledUser>
  );
}

export { User };
export type { UserProps };
