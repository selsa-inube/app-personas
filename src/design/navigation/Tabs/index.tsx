import { Stack } from "@design/layout/Stack";
import { Tab, TabProps } from "../Tab";
import { StyledTabs } from "./styles";

interface TabsProps {
  tabs: TabProps[];
  selectedTab: string;
  onChange: (id: string) => void;
}

function Tabs(props: TabsProps) {
  const { tabs, selectedTab, onChange } = props;

  const handleTabClick = (id: string) => {
    const tab = tabs.find((tab) => tab.id === id);
    if (!tab?.isDisabled) {
      onChange(id);
    }
  };

  return (
    <StyledTabs>
      <Stack gap="24px">
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            isDisabled={tab.isDisabled}
            isSelected={tab.id === selectedTab}
            id={tab.id}
            label={tab.label}
            onClick={() => handleTabClick(tab.id)}
          />
        ))}
      </Stack>
    </StyledTabs>
  );
}

export type { TabsProps };
export { Tabs };
