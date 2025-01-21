import { useMediaQuery } from "@hooks/useMediaQuery";
import { Button } from "@inubekit/button";
import { Divider } from "@inubekit/divider";
import { Icon } from "@inubekit/inubekit";
import { Text } from "@inubekit/text";
import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { StyledContainer, StyledHead } from "./styles";

interface AccordionProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
  withButton?: boolean;
  buttonText?: string;
  onClickButton?: () => void;
}

function Accordion(props: AccordionProps) {
  const {
    title,
    defaultOpen = true,
    children,
    withButton = false,
    buttonText = "",
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
        <Text type="label" size={isMobile ? "medium" : "large"} weight="bold">
          {title}
        </Text>

        {!withButton ? (
          isOpen ? (
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
          )
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
