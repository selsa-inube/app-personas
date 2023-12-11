import { useState } from "react";
import { Tabs, ITabsProps } from "..";

const TabsController = (props: ITabsProps) => {
  const { tabs } = props;
  const [currentTab, setCurrentTab] = useState(props.selectedTab);

  const onChange = (tabId: string) => {
    setCurrentTab(tabId);
  };

  return <Tabs tabs={tabs} onChange={onChange} selectedTab={currentTab} />;
};

export { TabsController };
