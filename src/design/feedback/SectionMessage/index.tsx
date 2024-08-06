import { useState } from "react";

import { useMediaQuery } from "@hooks/useMediaQuery";
import { MdClear } from "react-icons/md";
import { CountdownBar } from "@inubekit/countdownbar";
import { StyledSectionMessage } from "./styles";

import { MessageAppearanceType } from "./types";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { inube } from "@design/tokens";

interface SectionMessageProps {
  icon: React.JSX.Element;
  title: string;
  description: string;
  appearance: MessageAppearanceType;
  duration: number;
  onClose: () => void;
}

const SectionMessage = (props: SectionMessageProps) => {
  const {
    icon,
    title,
    description,
    appearance = "primary",
    duration,
    onClose,
  } = props;

  const [isPaused, setIsPaused] = useState(false);
  const isMobile = useMediaQuery("(max-width: 565px)");

  const newDescription = description.substring(0, 240);

  return (
    <StyledSectionMessage
      $appearance={appearance}
      $isMessageResponsive={isMobile}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Stack justifyContent="space-between" padding={inube.spacing.s200}>
        <Stack
          gap={inube.spacing.s200}
          alignItems={isMobile ? "center" : undefined}
          width="100%"
        >
          <Stack alignItems="center" gap={inube.spacing.s200} width="100%">
            <Icon
              size="24px"
              spacing="wide"
              appearance={appearance}
              icon={icon}
            />
            <Stack direction="column" gap={inube.spacing.s075} width="100%">
              <Stack justifyContent="space-between" alignItems="center">
                <Text size="large" type="label">
                  {title}
                </Text>
                <Icon
                  size="16px"
                  spacing="narrow"
                  onClick={onClose}
                  appearance="dark"
                  icon={<MdClear />}
                  cursorHover
                />
              </Stack>

              {!isMobile && (
                <Text type="body" size="small" appearance="gray">
                  {newDescription}
                </Text>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      {duration && (
        <CountdownBar
          paused={isPaused}
          appearance={appearance}
          duration={duration}
          onCountdown={onClose}
        />
      )}
    </StyledSectionMessage>
  );
};

export { SectionMessage };
export type { SectionMessageProps };
