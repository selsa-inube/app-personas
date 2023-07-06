import PropTypes from "prop-types";

import { Stack } from "../../layout/Stack";
import { Avatar } from "../Avatar";
import { Text } from "../Text";
import { StyledUser } from "./styles";

function User(props) {
  const { username, client } = props;

  return (
    <StyledUser>
      <Stack gap="16px">
        <Stack direction="column" justifyContent="center">
          <Text type="label" size="medium" textAlign="center">
            {username}
          </Text>
          {client && (
            <Text type="body" size="small" color="gray" textAlign="center">
              {client}
            </Text>
          )}
        </Stack>
        <Avatar />
      </Stack>
    </StyledUser>
  );
}

User.propTypes = {
  username: PropTypes.string.isRequired,
  client: PropTypes.string,
};

export { User };
