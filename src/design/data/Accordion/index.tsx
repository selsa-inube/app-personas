import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import {
  Button,
  Divider,
  Icon,
  ITag,
  Stack,
  Tag,
  Text,
} from "@inubekit/inubekit";
import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { StyledContainer, StyledHead } from "./styles";

interface AccordionProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
  withButton?: boolean;
  buttonText?: string;
  tag?: ITag;
  onClickButton?: () => void;
}

function Accordion(props: AccordionProps) {
  const {
    title,
    defaultOpen = true,
    children,
    withButton = false,
    buttonText = "",
    tag,
    onClickButton,
  } = props;

  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleToggleOpen = () => {
    if (!withButton) {
      setIsOpen(!isOpen);
    }
  };

  const isMobile = useMediaQuery("(max-width: 450px)");

  return (
    <StyledContainer $isMobile={isMobile}>
      <StyledHead onClick={handleToggleOpen}>
        {isMobile && tag ? (
          <Stack direction="column" gap={inube.spacing.s050}>
            <Text
              type="label"
              size={isMobile ? "medium" : "large"}
              weight="bold"
            >
              {title}
            </Text>

            <Tag
              appearance={tag.appearance}
              label={tag.label}
              id={tag.id}
              displayIcon={tag.displayIcon}
            />
          </Stack>
        ) : (
          <Text type="label" size={isMobile ? "medium" : "large"} weight="bold">
            {title}
          </Text>
        )}

        {!withButton ? (
          <Stack direction="row" gap={inube.spacing.s150} alignItems="center">
            {tag && !isMobile && (
              <Stack alignItems="flex-start">
                <Tag
                  appearance={tag.appearance}
                  label={tag.label}
                  id={tag.id}
                  displayIcon={tag.displayIcon}
                />
              </Stack>
            )}

            {isOpen ? (
              <Icon
                icon={<MdKeyboardArrowUp size={24} />}
                appearance="dark"
                spacing="compact"
                cursorHover={true}
              />
            ) : (
              <Icon
                icon={<MdKeyboardArrowDown size={24} />}
                appearance="dark"
                spacing="compact"
                cursorHover={true}
              />
            )}
          </Stack>
        ) : (
          <Button spacing="compact" variant="none" onClick={onClickButton}>
            {buttonText}
          </Button>
        )}
      </StyledHead>

      {(isOpen || withButton) && (
        <>
          <Divider dashed />
          {children}
        </>
      )}
    </StyledContainer>
  );
}

export { Accordion };
export type { AccordionProps };
