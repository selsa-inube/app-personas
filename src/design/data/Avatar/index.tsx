import { MdPersonOutline } from "react-icons/md";
import { Icon } from "../Icon";

interface AvatarProps {
  isHovered: boolean;
}

function Avatar(props: AvatarProps) {
  const { isHovered } = props;
  return (
    <Icon
      icon={<MdPersonOutline />}
      variant="filled"
      shape="circle"
      spacing="compact"
      parentHover={isHovered}
    />
  );
}

export { Avatar };
