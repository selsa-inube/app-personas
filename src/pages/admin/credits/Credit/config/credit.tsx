import { MdOutlineAssignment, MdOutlineAttachMoney } from "react-icons/md";

const creditBox = {
  icon: <MdOutlineAttachMoney size={34} />,
  collapsing: { start: true, allow: true },
  button: {
    label: "Plan de pagos",
    icon: <MdOutlineAssignment />,
    path: "/",
  },
};

export { creditBox };
