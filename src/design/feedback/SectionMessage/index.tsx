import { useState } from "react";

import { Text } from "@design/data/Text";
import { Stack } from "@design/layout/Stack";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { MdClear } from "react-icons/md";
import { CountdownBar } from "@inubekit/countdownbar";
import { StyledSectionMessage } from "./styles";

import { Icon } from "@design/data/Icon";
import { MessageAppearanceType } from "./types";

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
      appearance={appearance}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      isMessageResponsive={isMobile}
    >
      <Stack justifyContent="space-between" padding="s200">
        <Stack
          gap="16px"
          alignItems={isMobile ? "center" : undefined}
          width="100%"
        >
          <Stack alignItems="center" gap="16px" width="100%">
            <Icon
              size="24px"
              spacing="wide"
              appearance={appearance}
              icon={icon}
            />
            <Stack direction="column" gap="6px" width="100%">
              <Stack justifyContent="space-between" alignItems="center">
                <Text size="large" type="label">
                  {title}
                </Text>
                <Icon
                  size="16px"
                  spacing="none"
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
