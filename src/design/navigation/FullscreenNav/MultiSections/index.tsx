import { Text } from "@design/data/Text";
import { INav } from "@design/layout/Page/types";
import { IHeaderLink } from "@design/navigation/Header/types";
import { NavLink } from "@design/navigation/NavLink";
import { useState } from "react";
import { MdOutlineChevronRight } from "react-icons/md";
import { StyledCollapseIcon, StyledSectionContainer } from "./styles";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/stack";

interface MultiSectionsProps {
  navigation: INav;
  links?: IHeaderLink[];
  onClose: () => void;
}

function MultiSections(props: MultiSectionsProps) {
  const { navigation, links, onClose } = props;

  const combinedSectionValues = [...Object.values(navigation.sections)];

  if (links && links.length > 0) {
    combinedSectionValues.push({
      title: "links",
      links: links,
    });
  }

  const [sectionCollapse, setSectionCollapse] = useState<{
    [sectionName: string]: boolean;
  }>(() => ({
    [combinedSectionValues[0].title]: true,
    ...combinedSectionValues.slice(1).reduce(
      (section, sectionValue) => ({
        ...section,
        [sectionValue.title]: false,
      }),
      {},
    ),
  }));

  const handleCollapse = (sectionName: string) => {
    setSectionCollapse((prev) =>
      Object.fromEntries(
        Object.entries(prev).map(([key]) => [key, key === sectionName]),
      ),
    );
  };

  return (
    <Stack direction="column">
      {combinedSectionValues.map((sectionValue) => (
        <Stack key={sectionValue.title} direction="column">
          <StyledSectionContainer
            $selected={sectionCollapse[sectionValue.title]}
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
            <StyledCollapseIcon $collapse={sectionCollapse[sectionValue.title]}>
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
                  icon={linkValue.icon}
                  path={linkValue.path}
                  onClick={onClose}
                >
                  {linkValue.label}
                </NavLink>
              ))}
            </Stack>
          )}
        </Stack>
      ))}
    </Stack>
  );
}

export { MultiSections };
