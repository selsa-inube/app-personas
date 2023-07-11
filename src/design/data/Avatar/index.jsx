import { MdPersonOutline } from "react-icons/md";
import { Icon } from "../Icon";

function Avatar() {
  return (
    <Icon
      icon={<MdPersonOutline />}
      variant="filled"
      shape="circle"
      spacing="compact"
      allowHover={true}
    />
  );
}

export { Avatar };
