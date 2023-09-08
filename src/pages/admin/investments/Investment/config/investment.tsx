import { MdOutlineRealEstateAgent, MdOutlineTimer } from "react-icons/md";

const investmentIcons: Record<string, React.JSX.Element> = {
  CD: <MdOutlineRealEstateAgent />,
  AP: <MdOutlineTimer />,
};

const investmentBox = (type: string) => ({
  icon: investmentIcons[type],
  collapsing: { start: false, allow: false },
});

export { investmentBox, investmentIcons };
