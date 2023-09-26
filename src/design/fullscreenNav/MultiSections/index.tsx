import { useState } from "react";
import { Stack } from "@design/layout/Stack";
import { INavigation } from "../types";
import { NavLink } from "@design/navigation/NavLink";
import { Text } from "@design/data/Text";
import { MdOutlineChevronRight } from "react-icons/md";
import { Icon } from "@design/data/Icon";
import { StyledCollapseIcon, StyledSectionContainer } from "./styles";

interface MultiSectionsProps {
  navigation: INavigation;
  onClose: () => void;
}

function MultiSections(props: MultiSectionsProps) {
  const { navigation, onClose } = props;
  const navigationSectionValues = Object.values(navigation.sections);

  const [sectionCollapse, setSectionCollapse] = useState<{
    [sectionName: string]: boolean;
  }>(
    navigationSectionValues.reduce((section, sectionValue) => {
      section[sectionValue.name] = false;
      return section;
    }, {} as { [sectionName: string]: boolean })
  );

  const handleCollapse = (sectionName: string) => {
    setSectionCollapse((prevState) => ({
      ...prevState,
      [sectionName]: !prevState[sectionName],
    }));
  };

  return (
    <Stack direction="column">
      {navigationSectionValues.map((sectionValue) => (
        <Stack key={sectionValue.name} direction="column">
          <StyledSectionContainer selected={sectionCollapse[sectionValue.name]}>
            <Text
              type="title"
              size="small"
              appearance={
                sectionCollapse[sectionValue.name] ? "primary" : "gray"
              }
            >
              {sectionValue.name}
            </Text>
            <StyledCollapseIcon
              collapse={sectionCollapse[sectionValue.name]}
              onClick={() => handleCollapse(sectionValue.name)}
            >
              <Icon
                icon={<MdOutlineChevronRight />}
                spacing="compact"
                appearance={
                  sectionCollapse[sectionValue.name] ? "primary" : "dark"
                }
              />
            </StyledCollapseIcon>
          </StyledSectionContainer>
          {sectionCollapse[sectionValue.name] && (
            <Stack direction="column">
              {Object.values(sectionValue.links).map((linkValue) => (
                <NavLink
                  key={linkValue.id}
                  children={linkValue.label}
                  icon={linkValue.icon}
                  path={linkValue.path}
                  onClick={onClose}
                />
              ))}
            </Stack>
          )}
        </Stack>
      ))}
    </Stack>
  );
}

export { MultiSections };
