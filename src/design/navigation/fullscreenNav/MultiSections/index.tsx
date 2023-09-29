import React, { useState } from "react";
import { Stack } from "@design/layout/Stack";
import { NavLink } from "@design/navigation/NavLink";
import { Text } from "@design/data/Text";
import { MdOutlineChevronRight } from "react-icons/md";
import { Icon } from "@design/data/Icon";
import { StyledCollapseIcon, StyledSectionContainer } from "./styles";
import { INav } from "@design/layout/Page/types";
import { IHeaderLink } from "@design/navigation/Header/types";

interface MultiSectionsProps {
  navigation: INav;
  links?: IHeaderLink[];
  onClose: () => void;
}

function MultiSections(props: MultiSectionsProps) {
  const { navigation, links, onClose } = props;
  const navigationSectionValues = Object.values(navigation.sections);
  const linkSectionValues = links
    ? links.map((link) => ({ title: link.label, links: [link] }))
    : [];

  const combinedSectionValues = [
    ...navigationSectionValues,
    ...linkSectionValues,
  ];

  const [sectionCollapse, setSectionCollapse] = useState<{
    [sectionName: string]: boolean;
  }>(() => {
    const initialSection = combinedSectionValues[0].title;
    const initialState = combinedSectionValues.reduce(
      (section, sectionValue) => {
        section[sectionValue.title] = sectionValue.title === initialSection;
        return section;
      },
      {} as { [sectionName: string]: boolean }
    );

    return initialState;
  });

  const handleCollapse = (sectionName: string) => {
    const updatedState: { [sectionName: string]: boolean } = {};
    for (const key in sectionCollapse) {
      updatedState[key] = false;
    }
    updatedState[sectionName] = true;
    setSectionCollapse(updatedState);
  };

  return (
    <Stack direction="column">
      {combinedSectionValues.length > 2
        ? combinedSectionValues.map((sectionValue) => (
            <Stack key={sectionValue.title} direction="column">
              <StyledSectionContainer
                selected={sectionCollapse[sectionValue.title]}
                onClick={() => handleCollapse(sectionValue.title)}
              >
                <Text
                  type="title"
                  size="small"
                  appearance={
                    sectionCollapse[sectionValue.title] ? "primary" : "gray"
                  }
                >
                  {sectionValue.title.toUpperCase()}
                </Text>
                <StyledCollapseIcon
                  collapse={sectionCollapse[sectionValue.title]}
                >
                  <Icon
                    icon={<MdOutlineChevronRight />}
                    spacing="compact"
                    appearance={
                      sectionCollapse[sectionValue.title] ? "primary" : "dark"
                    }
                  />
                </StyledCollapseIcon>
              </StyledSectionContainer>
              {sectionCollapse[sectionValue.title] && (
                <Stack direction="column">
                  {Object.values(sectionValue.links).map((linkValue) => (
                    <NavLink
                      key={linkValue.label}
                      children={linkValue.label}
                      icon={linkValue.icon}
                      path={linkValue.path}
                      onClick={onClose}
                    />
                  ))}
                </Stack>
              )}
            </Stack>
          ))
        : combinedSectionValues.map((sectionValue) => (
            <Stack key={sectionValue.title} direction="column">
              <StyledSectionContainer>
                <Text type="title" size="small" appearance="gray">
                  {sectionValue.title.toUpperCase()}
                </Text>
              </StyledSectionContainer>
              <Stack key={sectionValue.title} direction="column">
                {Object.values(sectionValue.links).map((linkValue) => (
                  <NavLink
                    key={linkValue.label}
                    children={linkValue.label}
                    icon={linkValue.icon}
                    path={linkValue.path}
                    onClick={onClose}
                  />
                ))}
              </Stack>
            </Stack>
          ))}
    </Stack>
  );
}

export { MultiSections };
