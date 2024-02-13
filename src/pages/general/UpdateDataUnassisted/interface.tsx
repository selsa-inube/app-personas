import { Title } from "@design/data/Title";
import { Stack } from "@design/layout/Stack";
import { Tabs } from "@design/navigation/Tabs";
import { Breadcrumbs } from "@design/navigation/Breadcrumbs";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { MdArrowBack } from "react-icons/md";
import { crumbsUpdateData } from "./config/navigation";
import { tabsConfig } from "./config/navigation";

interface UpdateDataUnassistedUIProps {
  selectedTab: string;
  onTabChange: (id: string) => void;
}

function UpdateDataUnassistedUI(props: UpdateDataUnassistedUIProps) {
  const { selectedTab, onTabChange } = props;

  const isMobile = useMediaQuery("(max-width: 450px)");
  const isTablet = useMediaQuery("(max-width: 1100px)");

  return (
    <Stack
      direction="column"
      gap={isMobile ? "s300" : isTablet ? "s500" : "s600"}
    >
      <Stack direction="column" gap="s300">
        <Breadcrumbs crumbs={crumbsUpdateData} />
        <Title
          title="Actualización de datos"
          subtitle="Actualiza tu información personal y de contacto"
          icon={<MdArrowBack />}
          navigatePage="/"
        />
      </Stack>
      <Tabs
        onChange={onTabChange}
        selectedTab={selectedTab}
        tabs={Object.values(tabsConfig)}
      />
    </Stack>
  );
}

export { UpdateDataUnassistedUI };
