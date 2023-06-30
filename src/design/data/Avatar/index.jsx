import { MdPersonOutline } from "react-icons/md";
import { Stack } from "../../layout/Stack";

import { StyledAvatar } from "./styles";

function Avatar() {
  return (
    <StyledAvatar>
      <Stack justifyContent="center" alignItems="center" height="32px">
        <MdPersonOutline size="24px" />
      </Stack>
    </StyledAvatar>
  );
}

export { Avatar };
