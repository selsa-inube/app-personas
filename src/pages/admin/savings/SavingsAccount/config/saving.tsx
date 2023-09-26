import {
  MdOutlineAccountBalanceWallet,
  MdOutlineHandshake,
  MdOutlineRealEstateAgent,
  MdOutlineTimer,
} from "react-icons/md";

const savingsAccountIcons: Record<string, React.JSX.Element> = {
  CA: <MdOutlineAccountBalanceWallet />,
  AP: <MdOutlineHandshake />,
};

const savingsAccountBox = (type: string) => ({
  icon: type ? savingsAccountIcons[type] : savingsAccountIcons.CA,
  collapsing: { start: false, allow: false },
});

const savingCommitmentsIcons: Record<string, React.JSX.Element> = {
  "0S": <MdOutlineRealEstateAgent />,
  SC: <MdOutlineTimer />,
};

export { savingCommitmentsIcons, savingsAccountBox, savingsAccountIcons };
