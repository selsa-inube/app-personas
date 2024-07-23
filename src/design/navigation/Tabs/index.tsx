import { Stack } from "@inubekit/stack";
import { Tab, TabProps } from "../Tab";
import { StyledTabs } from "./styles";
import { inube } from "@design/tokens";

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
      <Stack gap={inube.spacing.s300}>
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
