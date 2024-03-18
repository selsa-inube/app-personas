import { MdOutlineCreditCard, MdOutlineCreditScore } from "react-icons/md";

const cardBox = {
  icon: <MdOutlineCreditCard size={34} />,
  collapsing: { start: false, allow: false },
};

const myQuotas = {
  icon: <MdOutlineCreditScore />,
  navigateTo: "",
  collapsing: { start: true, allow: true },
};

export { cardBox, myQuotas };
