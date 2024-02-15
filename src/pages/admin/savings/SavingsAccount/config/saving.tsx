import {
  MdCalendarMonth,
  MdOutlineAccountBalanceWallet,
  MdOutlineHandshake,
  MdOutlineRealEstateAgent,
  MdOutlineTimer,
} from "react-icons/md";
import { EProductType } from "src/model/entity/product";

const savingsAccountIcons: Record<string, React.JSX.Element> = {
  [EProductType.VIEWSAVINGS]: <MdOutlineAccountBalanceWallet />,
  [EProductType.PERMANENTSAVINGS]: <MdOutlineHandshake />,
  [EProductType.CONTRIBUTIONS]: <MdOutlineHandshake />,
  [EProductType.CDAT]: <MdOutlineRealEstateAgent />,
  [EProductType.PROGRAMMEDSAVINGS]: <MdOutlineTimer />,
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
  [EProductType.PROGRAMMEDSAVINGS]: <MdCalendarMonth />,
};

const investmentIcons: Record<string, React.JSX.Element> = {
  [EProductType.CDAT]: <MdOutlineRealEstateAgent />,
  [EProductType.PROGRAMMEDSAVINGS]: <MdOutlineTimer />,
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
