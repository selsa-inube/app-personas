import { useMediaQuery } from "@hooks/useMediaQuery";
import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { Icon } from "../Icon";
import { Text } from "../Text";
import { StyledContainer, StyledHead } from "./styles";
import { Divider } from "@inubekit/divider";

interface AccordionProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

function Accordion(props: AccordionProps) {
  const { title, defaultOpen = true, children } = props;
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleToggleOpen = () => setIsOpen(!isOpen);

  const isMobile = useMediaQuery("(max-width: 450px)");

  return (
    <StyledContainer isMobile={isMobile}>
      <StyledHead onClick={handleToggleOpen}>
        <Text type="label" size={isMobile ? "medium" : "large"}>
          {title}
        </Text>

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
      </StyledHead>

      {isOpen && (
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
