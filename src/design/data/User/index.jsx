import PropTypes from "prop-types";

import { Stack } from "../../layout/Stack";
import { Avatar } from "../Avatar";
import { Text } from "../Text";
import { StyledUser } from "./styles";

function User({ username, businessUnit }) {
  return (
    <StyledUser>
      <Stack gap="16px">
        <Stack direction="column">
          <Text type="label" size="medium">
            {username}
          </Text>
          {businessUnit && (
            <Text type="body" size="small" color="gray">
              {businessUnit}
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
  businessUnit: PropTypes.string,
};

export { User };
