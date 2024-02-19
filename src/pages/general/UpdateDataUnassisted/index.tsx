import { UpdateDataUnassistedUI } from "./interface";
import { tabsConfig } from "./config/navigation";
import { useState } from "react";

function UpdateDataUnassisted() {
  const [selectedTab, setSelectedTab] = useState(
    tabsConfig.personalInformation.id,
  );

  const handleTabChange = (tabId: string) => {
    setSelectedTab(tabId);
  };

  return (
    <UpdateDataUnassistedUI
      selectedTab={selectedTab}
      onTabChange={handleTabChange}
    />
  );
}

export { UpdateDataUnassisted };
