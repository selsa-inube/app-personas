import { useState } from "react";
import { Stack } from "../../layout/Stack";
import { Avatar } from "../Avatar";
import { Text } from "../Text";
import { StyledUser } from "./styles";

interface UserProps {
  username: string;
  client?: string;
  onlyAvatar?: boolean;
  onClick?: () => void;
}

function User(props: UserProps) {
  const { username, client, onlyAvatar, onClick } = props;
  const [isHovered, setIsHovered] = useState(false);

  function toggleHover(state: boolean) {
    setIsHovered(state);
  }

  return (
    <StyledUser
      onMouseOver={() => toggleHover(true)}
      onMouseLeave={() => toggleHover(false)}
      onClick={onClick}
    >
      <Stack gap="16px">
        {!onlyAvatar && (
          <Stack direction="column" justifyContent="center">
            <Text type="label" size="medium" textAlign="center">
              {username}
            </Text>
            {client && (
              <Text
                type="body"
                size="small"
                appearance="gray"
                textAlign="center"
              >
                {client}
              </Text>
            )}
          </Stack>
        )}

        <Avatar parentHover={isHovered} />
      </Stack>
    </StyledUser>
  );
}

export { User };
export type { UserProps };
