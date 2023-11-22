import { useState } from "react";

import { MdClear } from "react-icons/md";
import { StyledSectionMessage } from "./styles";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Stack } from "@design/layout/Stack";
import { Text } from "@design/data/Text";
import { CountdownBar } from "../CountdownBar";

import { Icon } from "@design/data/Icon";
import { MessageAppearanceType } from "./types";

interface SectionMessageProps {
  icon: JSX.Element;
  title: string;
  description: string;
  appearance: MessageAppearanceType;
  duration: number;
  closeSectionMessage: () => void;
  isMessageResponsive: boolean;
}

const SectionMessage = (props: SectionMessageProps) => {
  const {
    icon,
    title,
    description,
    appearance = "primary",
    duration,
    closeSectionMessage,
  } = props;

  const [isPaused, setIsPaused] = useState(false);
  const isMessageResponsive = useMediaQuery("(max-width: 565px)");

  const newDescription = description.substring(0, 240);

  return (
    <StyledSectionMessage
      appearance={appearance}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      isMessageResponsive={isMessageResponsive}
    >
      <Stack justifyContent="space-between" padding="s200">
        <Stack
          gap="16px"
          alignItems={isMessageResponsive ? "center" : undefined}
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
                  onClick={closeSectionMessage}
                  appearance="dark"
                  icon={<MdClear />}
                  cursorHover
                />
              </Stack>

              {!isMessageResponsive && (
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
          onCountdown={closeSectionMessage}
        />
      )}
    </StyledSectionMessage>
  );
};

export { SectionMessage };
export type { SectionMessageProps };
