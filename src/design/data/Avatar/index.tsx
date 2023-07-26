import { MdPersonOutline } from "react-icons/md";
import { Icon } from "../Icon";

function Avatar(): JSX.Element {
  return (
    <Icon
      icon={<MdPersonOutline />}
      variant="filled"
      shape="circle"
      spacing="compact"
      parentHover={true}
    />
  );
}

export { Avatar };
