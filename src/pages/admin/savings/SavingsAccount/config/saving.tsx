import {
  MdCalendarMonth,
  MdOutlineAccountBalanceWallet,
  MdOutlineHandshake,
  MdOutlineRealEstateAgent,
  MdOutlineTimer,
} from "react-icons/md";

const savingsAccountIcons: Record<string, React.JSX.Element> = {
  VIEWSAVINGS: <MdOutlineAccountBalanceWallet />,
  PERMANENTSAVINGS: <MdOutlineHandshake />,
  CONTRIBUTIONS: <MdOutlineHandshake />,
  CD: <MdOutlineRealEstateAgent />,
  PROGRAMMEDSAVINGS: <MdOutlineTimer />,
};

const savingsAccountBox = (type: string) => ({
  icon: type ? savingsAccountIcons[type] : savingsAccountIcons.CA,
  collapsing: { start: true, allow: false },
});

const savingCommitmentsIcons: Record<string, React.JSX.Element> = {
  "0S": <MdOutlineRealEstateAgent />,
  SC: <MdOutlineTimer />,
};

const investmentCommitmentsIcons: Record<string, React.JSX.Element> = {
  PROGRAMMEDSAVINGS: <MdCalendarMonth />,
};

const investmentIcons: Record<string, React.JSX.Element> = {
  CD: <MdOutlineRealEstateAgent />,
  PROGRAMMEDSAVINGS: <MdOutlineTimer />,
};

const investmentBox = (type: string) => ({
  icon: investmentIcons[type],
  collapsing: { start: true, allow: false },
});

export {
  investmentBox,
  investmentCommitmentsIcons,
  investmentIcons,
  savingCommitmentsIcons,
  savingsAccountBox,
  savingsAccountIcons,
};
