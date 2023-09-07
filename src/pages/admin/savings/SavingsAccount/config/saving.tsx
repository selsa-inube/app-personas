import {
  MdOutlineAccountBalanceWallet,
  MdOutlineHandshake,
} from "react-icons/md";

const savingsAccountIcons: Record<string, React.JSX.Element> = {
  CA: <MdOutlineAccountBalanceWallet />,
  AP: <MdOutlineHandshake />,
};

const savingsAccountBox = (type: string) => ({
  icon: type ? savingsAccountIcons[type] : savingsAccountIcons.CA,
  collapsing: { start: false, allow: false },
});

export { savingsAccountIcons, savingsAccountBox };
