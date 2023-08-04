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
        <StyledLink to={navigateTo}>
          <Stack alignItems="center" gap="s100">
            <Icon icon={icon} variant="filled" />
            <Stack direction="column" gap="s025">
              <Text type="title" size="medium">
                {title}
              </Text>
              <Text appearance="gray" size="small">
                {subtitle}
              </Text>
            </Stack>
          </Stack>
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
        </StyledLink>
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
