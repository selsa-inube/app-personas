import { useState } from "react";
import PropTypes from "prop-types";
import { MdOutlineChevronRight } from "react-icons/md";

import { Stack } from "../../../design/layout/Stack";
import { Icon } from "../../../design/data/Icon";
import { Text } from "../../../design/data/Text";
import { Button } from "../../../design/input/Button";

import { inube } from "../../../design/tokens";

import { StyledBox, StyledCollapseIcon, StyledDivider } from "./styles";

function Box(props) {
  const {
    icon,
    title,
    subtitle,
    children,
    button,
    collapsing = {
      allow: true,
      start: false,
    },
  } = props;

  const [collapse, setCollapse] = useState(collapsing.start);

  return (
    <StyledBox>
      <Stack direction="column" gap={inube.spacing.s200}>
        <Stack justifyContent="space-between" alignItems="center">
          <Stack alignItems="center" gap={inube.spacing.s100}>
            <Icon icon={icon} variant="filled" />
            <Stack direction="column">
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
      <Stack></Stack>
    </StyledBox>
  );
}

Box.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  children: PropTypes.node.isRequired,
  button: PropTypes.shape({
    label: PropTypes.string.isRequired,
    icon: PropTypes.node,
    path: PropTypes.string.isRequired,
  }),
  collapsing: PropTypes.shape({
    allow: PropTypes.bool,
    start: PropTypes.bool,
  }),
};

export { Box };
