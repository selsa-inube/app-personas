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

interface CollapseCardProps {
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
  footer?: {
    label: string;
    value: string | undefined;
  };
}

function CollapseCard(props: CollapseCardProps) {
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
    footer,
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
                variant="outlined"
                spacing="narrow"
                size="24px"
                shape="rectangle"
                cursorHover
              />
            )}
            <Stack direction="column" gap={inube.spacing.s025}>
              {loading ? (
                <SkeletonLine animated width="200px" />
              ) : (
                <Text
                  type="title"
                  size="medium"
                  appearance="dark"
                  weight="bold"
                >
                  {title}
                </Text>
              )}

              <Stack gap={inube.spacing.s100} alignItems="center">
                {loading ? (
                  <SkeletonLine animated width="200px" />
                ) : (
                  <Text
                    type="title"
                    size="small"
                    appearance="gray"
                    weight="normal"
                  >
                    {subtitle}
                  </Text>
                )}
              </Stack>
            </Stack>

          </StyledLink>

          <Stack gap={inube.spacing.s150} alignItems="center">
            <Stack gap={inube.spacing.s075} alignItems="center" height="20px">
              {
                tags.length > 0 &&
                <Tag
                  appearance="danger"
                  label={`${tags.length} Vencidos`}
                  displayIcon
                />
              }
            </Stack>

            {collapsing.allow && (
              <StyledCollapseIcon $collapse={collapse} onClick={handleCollapse}>
                <Icon
                  icon={<MdOutlineChevronRight />}
                  appearance="dark"
                  spacing="narrow"
                  cursorHover
                />
              </StyledCollapseIcon>
            )}
          </Stack>
        </Stack>

        {(withCustomCollapse || !collapsing.allow || !collapse || button) && (
          <Divider dashed />
        )}

        {(withCustomCollapse || !collapsing.allow || !collapse) && (
          <>{loading ? <SkeletonLine animated width="100%" /> : children}</>
        )}

        {
          (footer && footer.value) && (
            <Stack
              direction="row"
              gap={inube.spacing.s075}
              alignItems="center"
              justifyContent="right"
            >
              {loading ? (
                <SkeletonLine animated width="200px" />
              ) : (
                <>
                  <Text appearance="gray" type="label" size="large" weight="normal">{footer.label}:</Text>
                  <Text appearance="dark" type="body" size="large" weight="bold">{footer.value}</Text>
                </>
              )}
            </Stack>
          )
        }

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

export { CollapseCard };
export type { CollapseCardProps };