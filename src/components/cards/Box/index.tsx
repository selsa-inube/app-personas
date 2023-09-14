import { useState } from "react";
import { MdOutlineChevronRight } from "react-icons/md";

import { Icon } from "@design/data/Icon";
import { Text } from "@design/data/Text";
import { Button } from "@design/input/Button";
import { Stack } from "@design/layout/Stack";

import { Tag, TagProps } from "@design/data/Tag";
import {
  StyledBox,
  StyledCollapseIcon,
  StyledDivider,
  StyledLink,
} from "./styles";

interface BoxProps {
  icon?: React.JSX.Element;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  button?: {
    label: string;
    icon: React.JSX.Element;
    path: string;
  };
  navigateTo?: string;
  collapsing: {
    allow: boolean;
    start: boolean;
  };
  tags?: TagProps[];
  withCustomCollapse?: boolean;
  onCustomCollapse?: () => void;
}

function Box(props: BoxProps) {
  const {
    icon,
    title,
    subtitle,
    children,
    button,
    navigateTo = "",
    collapsing = {
      allow: true,
      start: false,
    },
    tags = [],
    withCustomCollapse,
    onCustomCollapse,
  } = props;

  const [collapse, setCollapse] = useState(collapsing.start);

  const handleCollapse = () => {
    setCollapse(!collapse);

    if (withCustomCollapse && onCustomCollapse) {
      onCustomCollapse();
    }
  };

  return (
    <StyledBox>
      <Stack direction="column" gap="s200">
        <Stack justifyContent="space-between" alignItems="center">
          <StyledLink to={navigateTo}>
            {icon && (
              <Icon icon={icon} variant="filled" cursorHover />
            )}
            <Stack direction="column" gap="s025">
              <Text type="title" size="medium">
                {title}
              </Text>

              <Stack gap="s100" alignItems="center">
                <Text appearance="gray" size="small">
                  {subtitle}
                </Text>
                <Stack gap="s050">
                  {tags.length > 0 &&
                    tags.map((tag) => <Tag {...tag} key={tag.label} />)}
                </Stack>
              </Stack>
            </Stack>
          </StyledLink>
          {collapsing.allow && (
            <StyledCollapseIcon collapse={collapse} onClick={handleCollapse}>
              <Icon
                icon={<MdOutlineChevronRight />}
                appearance="dark"
                spacing="compact"
                cursorHover={true}
              />
            </StyledCollapseIcon>
          )}
        </Stack>
        <StyledDivider />
        {(withCustomCollapse || !collapsing.allow || collapse) && children}
        {button && (
          <Stack justifyContent="flex-end">
            <Button
              type={button.path ? "link" : "button"}
              path={button.path}
              iconBefore={button.icon}
              variant="none"
              spacing="compact"
              appearance="dark"
              fullwidth={false}
            >
              {button.label}
            </Button>
          </Stack>
        )}
      </Stack>
    </StyledBox>
  );
}

export { Box };
export type { BoxProps };
