import { Stack } from "@design/layout/Stack";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { Icon } from "../Icon";
import { Text } from "../Text";

interface TitleProps {
  title: string;
  subtitle?: string;
  icon?: JSX.Element;
  navigatePage?: string;
}

function Title(props: TitleProps) {
  const { title, subtitle, icon, navigatePage } = props;
  const navigate = useNavigate();

  const smallScreen = useMediaQuery("(max-width: 580px)");

  const handleBackPage = () => {
    if (navigatePage) return navigate(navigatePage);
    return navigate(-1);
  };

  return (
    <Stack gap="s050" direction="column">
      <Stack gap="s150" alignItems="center">
        {icon && (
          <Icon
            appearance="dark"
            onClick={handleBackPage}
            icon={icon}
            cursorHover={true}
          />
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
