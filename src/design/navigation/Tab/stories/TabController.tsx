import { useState, useEffect } from "react";
import { Tab, TabProps } from "../index";

const TabController = (props: TabProps) => {
  const { isDisabled = false } = props;
  const [selectedTab, setSelectedTab] = useState(false);

  useEffect(() => {
    if (isDisabled) {
      setSelectedTab(false);
    }
  }, [isDisabled]);

  const handleClickTab = () => {
    if (!isDisabled) {
      setSelectedTab(!selectedTab);
    }
  };

  return (
    <div onClick={handleClickTab} tabIndex={0}>
      <Tab {...props} isSelected={selectedTab} />
    </div>
  );
};

export { TabController };
