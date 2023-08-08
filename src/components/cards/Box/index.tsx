import { useState } from "react";
import { MdOutlineChevronRight } from "react-icons/md";

import { Icon } from "@design/data/Icon";
import { Text } from "@design/data/Text";
import { Button } from "@design/input/Button";
import { Stack } from "@design/layout/Stack";

import { StyledBox, StyledCollapseIcon, StyledDivider, StyledLink } from "./styles";

interface BoxProps {
  icon: React.JSX.Element;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  button: {
    label: string;
    icon: React.JSX.Element;
    path: string;
  };
  navigateTo?: string;
  collapsing: {
    allow: boolean;
    start: boolean;
  };
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
  } = props;

  const [collapse, setCollapse] = useState(collapsing.start);

  return (
    <StyledBox>
      <Stack direction="column" gap="s200">
        <Stack justifyContent="space-between" alignItems="center">
          <StyledLink to={navigateTo}>
            <Icon icon={icon} variant="filled" cursorHover={true}/>
            <Stack direction="column" gap="s025">
              <Text type="title" size="medium" cursorHover={true}>
                {title}
              </Text>
              <Text appearance="gray" size="small" cursorHover={true}>
                {subtitle}
              </Text>
            </Stack>
          </StyledLink>
          {collapsing.allow && (
            <StyledCollapseIcon
              collapse={collapse}
              onClick={() => setCollapse(!collapse)}
            >
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
        {(!collapsing.allow || collapse) && children}
        {button && (
          <Stack justifyContent="flex-end">
            <Button
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
