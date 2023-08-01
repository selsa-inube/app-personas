import { Stack } from "@design/layout/Stack";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { Text } from "../Text";
import { StyledIcon } from "./styles";

interface TitleProps {
  title: string;
  subtitle?: string;
  icon?: JSX.Element;
  navigatePage?: string;
  parentDisabled?: boolean;
}

function Title(props: TitleProps) {
  const { title, subtitle, icon, navigatePage, parentDisabled } = props;
  const navigate = useNavigate();

  const smallScreen = useMediaQuery("(max-width: 580px)");

  const handleBackPage = () => {
    if (parentDisabled) return;
    if (navigatePage) return navigate(navigatePage);
    return navigate(-1);
  };

  return (
    <Stack gap="4px" direction="column">
      <Stack gap="8px" alignItems="center">
        {icon && (
          <StyledIcon onClick={handleBackPage} parentDisabled={parentDisabled}>
            {icon}
          </StyledIcon>
        )}

        <Text as="h1" type="title" size={smallScreen ? "medium" : "large"}>
          {title}
        </Text>
      </Stack>
      <Text
        type="body"
        size={smallScreen ? "small" : "medium"}
        appearance="gray"
      >
        {subtitle}
      </Text>
    </Stack>
  );
}

export { Title };
export type { TitleProps };
