import { MdPersonOutline } from "react-icons/md";
import { Icon } from "../Icon";

interface AvatarProps {
  parentHover?: boolean;
}

function Avatar(props: AvatarProps) {
  const { parentHover } = props;
  return (
    <Icon
      icon={<MdPersonOutline />}
      variant="filled"
      shape="circle"
      spacing="compact"
      parentHover={parentHover}
    />
  );
}

export { Avatar };
