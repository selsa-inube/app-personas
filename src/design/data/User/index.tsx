import { Stack } from "../../layout/Stack";
import { Avatar } from "../Avatar";
import { Text } from "../Text";
import { StyledUser } from "./styles";
import { useState } from "react";

interface UserProps {
  username: string;
  client?: string;
}

function User(props: UserProps) {
  const { username, client } = props;
  const [isHovered, setIsHovered] = useState(false);

  function toggleHover(state: boolean) {
    setIsHovered(state);
  }

  return (
    <StyledUser
      onMouseOver={() => toggleHover(true)}
      onMouseLeave={() => toggleHover(false)}
    >
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
        <Avatar isHovered={isHovered} />
      </Stack>
    </StyledUser>
  );
}

export { User };
export type { UserProps };
