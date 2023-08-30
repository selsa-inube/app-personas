import { useState } from "react";
import { MdOutlineChevronRight } from "react-icons/md";

import { Icon } from "@design/data/Icon";
import { Text } from "@design/data/Text";
import { Button } from "@design/input/Button";
import { Stack } from "@design/layout/Stack";

import { Tag } from "@design/data/Tag";
import { ITag } from "@ptypes/pages/product.types";
import {
  StyledBox,
  StyledCollapseIcon,
  StyledDivider,
  StyledLink,
} from "./styles";

interface BoxProps {
  icon: React.JSX.Element;
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
  tags?: ITag[];
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
  } = props;

  const [collapse, setCollapse] = useState(collapsing.start);

  return (
    <StyledBox>
      <Stack direction="column" gap="s200">
        <Stack justifyContent="space-between" alignItems="center">
          <StyledLink to={navigateTo}>
            <Icon icon={icon} variant="filled" />
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
