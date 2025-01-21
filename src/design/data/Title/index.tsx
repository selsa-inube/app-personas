import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/inubekit";
import { Text } from "@inubekit/text";
import { useNavigate } from "react-router-dom";

interface TitleProps {
  title: string;
  subtitle?: string;
  icon?: React.JSX.Element;
  navigatePage?: string;
}

function Title(props: TitleProps) {
  const { title, subtitle, icon, navigatePage } = props;
  const navigate = useNavigate();

  const isMobile = useMediaQuery("(max-width: 580px)");

  const handleBackPage = () => {
    if (navigatePage) return navigate(navigatePage);
    return navigate(-1);
  };

  return (
    <Stack gap={inube.spacing.s050} direction="column">
      <Stack gap={inube.spacing.s150} alignItems="center">
        {icon && (
          <Icon
            appearance="dark"
            onClick={handleBackPage}
            icon={icon}
            cursorHover={true}
            size="20px"
            spacing="narrow"
          />
        )}

        <Text as="h1" type="title" size={isMobile ? "medium" : "large"}>
          {title}
        </Text>
      </Stack>
      <Text type="body" size={isMobile ? "small" : "medium"} appearance="gray">
        {subtitle}
      </Text>
    </Stack>
  );
}

export { Title };
export type { TitleProps };
