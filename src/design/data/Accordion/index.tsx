import { Divider } from "@design/layout/Divider";
import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { Icon } from "../Icon";
import { Text } from "../Text";
import { StyledContainer, StyledHead } from "./styles";

interface AccordionProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

function Accordion(props: AccordionProps) {
  const { title, defaultOpen = true, children } = props;
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleToggleOpen = () => setIsOpen(!isOpen);

  return (
    <StyledContainer>
      <StyledHead onClick={handleToggleOpen}>
        <Text type="label" size="large">
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
