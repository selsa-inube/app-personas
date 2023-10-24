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
  collapsing: { start: true, allow: false },
});

const savingCommitmentsIcons: Record<string, React.JSX.Element> = {
  "0S": <MdOutlineRealEstateAgent />,
  SC: <MdOutlineTimer />,
};

const investmentIcons: Record<string, React.JSX.Element> = {
  CD: <MdOutlineRealEstateAgent />,
  AP: <MdOutlineTimer />,
};

const investmentBox = (type: string) => ({
  icon: investmentIcons[type],
  collapsing: { start: true, allow: false },
});

export {
  savingCommitmentsIcons,
  savingsAccountIcons,
  investmentIcons,
  savingsAccountBox,
  investmentBox,
};
