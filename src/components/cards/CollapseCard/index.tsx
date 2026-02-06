import { useMemo, useState } from "react";
import { MdOutlineChevronRight } from "react-icons/md";
import { inube } from "@design/tokens";
import {
  Divider,
  Icon,
  ITag,
  SkeletonLine,
  Stack,
  Tag,
  Text,
} from "@inubekit/inubekit";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { StyledBox, StyledCollapseIcon, StyledLink } from "./styles";

interface CollapseCardProps {
  icon?: React.JSX.Element;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
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

  const isMobile = useMediaQuery("(max-width: 640px)");
  const [collapse, setCollapse] = useState(collapsing.start);

  const handleCollapse = () => {
    setCollapse(!collapse);

    if (withCustomCollapse && onCustomCollapse) {
      onCustomCollapse();
    }
  };

  const renderTags = useMemo(() => tags.length > 0 && (
    <Stack gap={inube.spacing.s075} alignItems="center" height="20px">
      <Tag
        appearance="danger"
        label={`${tags.length} Vencidos`}
        displayIcon
      />
    </Stack>
  ), [tags]);

  return (
    <StyledBox>
      <Stack direction="column" gap={isMobile ? inube.spacing.s100 : inube.spacing.s200}>
        <Stack justifyContent="space-between" alignItems={isMobile ? "start" : "center"} gap={inube.spacing.s150}>
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
                <>
                  <SkeletonLine animated width="200px" />
                  <SkeletonLine animated width="90px" />
                </>
              ) : (
                <Stack direction={isMobile ? "column" : "row"} gap={inube.spacing.s100} alignItems={isMobile ? "normal" : "center"}>
                  <Text
                    type="title"
                    size="medium"
                    appearance="dark"
                    weight="bold"
                  >
                    {title}
                  </Text>
                  {!isMobile && renderTags}
                </Stack>
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
            {collapsing.allow && (
              <Stack direction="row" gap={inube.spacing.s050} alignItems="center" justifyContent="center">
                <Text
                  type="label"
                  size={isMobile ? "small" : "medium"}
                  appearance="gray"
                  cursorHover
                  onClick={handleCollapse}
                >
                  Ver detalles
                </Text>
                <StyledCollapseIcon $collapse={collapse} onClick={handleCollapse}>
                  <Icon
                    size="20px"
                    icon={<MdOutlineChevronRight />}
                    appearance="gray"
                    spacing="narrow"
                    cursorHover
                  />
                </StyledCollapseIcon>
              </Stack>
            )}
          </Stack>
        </Stack>

        {isMobile && <StyledLink to={navigateTo}>{renderTags}</StyledLink>}

        {(withCustomCollapse || !collapsing.allow || !collapse) && (
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

      </Stack>
    </StyledBox>
  );
}

export { CollapseCard };
export type { CollapseCardProps };