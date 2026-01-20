import { useState } from "react";
import { MdOutlineChevronRight } from "react-icons/md";

import { inube } from "@design/tokens";
import {
  Button,
  Divider,
  IButtonAppearance,
  IButtonVariant,
  Icon,
  ITag,
  SkeletonLine,
  Stack,
  Tag,
  Text,
} from "@inubekit/inubekit";
import { StyledBox, StyledCollapseIcon, StyledLink } from "./styles";

interface BoxProps {
  icon?: React.JSX.Element;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  button?: {
    label: string;
    icon: React.JSX.Element;
    path?: string;
    onClick?: () => void;
    appearance?: IButtonAppearance;
    variant?: IButtonVariant;
  };
  navigateTo?: string;
  collapsing: {
    allow: boolean;
    start: boolean;
  };
  tags?: ITag[];
  withCustomCollapse?: boolean;
  loading?: boolean;
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
      start: true,
    },
    tags = [],
    withCustomCollapse,
    loading,
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
      <Stack direction="column" gap={inube.spacing.s200}>
        <Stack justifyContent="space-between" alignItems="center">
          <StyledLink to={navigateTo}>
            {icon && (
              <Icon
                appearance="primary"
                icon={icon}
                variant="filled"
                spacing="wide"
                size="42px"
                cursorHover
              />
            )}
            <Stack direction="column" gap={inube.spacing.s025}>
              {loading ? (
                <SkeletonLine animated width="200px" />
              ) : (
                <Text type="title" size="medium">
                  {title}
                </Text>
              )}

              <Stack gap={inube.spacing.s100} alignItems="center">
                {loading ? (
                  <SkeletonLine animated width="200px" />
                ) : (
                  <Text appearance="gray" size="small">
                    {subtitle}
                  </Text>
                )}
                <Stack gap={inube.spacing.s050}>
                  {tags.length > 0 &&
                    tags.map((tag) => <Tag {...tag} key={tag.label} />)}
                </Stack>
              </Stack>
            </Stack>
          </StyledLink>
          {collapsing.allow && (
            <StyledCollapseIcon $collapse={collapse} onClick={handleCollapse}>
              <Icon
                icon={<MdOutlineChevronRight />}
                appearance="dark"
                spacing="compact"
                cursorHover={true}
              />
            </StyledCollapseIcon>
          )}
        </Stack>
        {(withCustomCollapse || !collapsing.allow || !collapse || button) && (
          <Divider dashed />
        )}
        {(withCustomCollapse || !collapsing.allow || !collapse) && (
          <>{loading ? <SkeletonLine animated width="100%" /> : children}</>
        )}
        {button && (
          <Stack justifyContent="flex-end">
            <Button
              type={button.path ? "link" : "button"}
              path={button.path}
              onClick={button.onClick}
              iconBefore={button.icon}
              variant={button.variant || "none"}
              spacing="compact"
              appearance={button.appearance || "dark"}
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
