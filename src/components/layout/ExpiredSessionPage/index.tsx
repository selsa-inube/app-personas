import { inube } from "@design/tokens";
import { Button, Icon, Stack, Text, useMediaQuery } from "@inubekit/inubekit";
import { MdOutlineRunningWithErrors, MdLogin } from "react-icons/md";

function ExpiredSessionPage() {
  const isMobile = useMediaQuery("(max-width: 550px)");

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100vh"
      gap={isMobile ? inube.spacing.s250 : inube.spacing.s400}
    >
      <Icon
        appearance="warning"
        spacing="narrow"
        size={isMobile ? "32px" : "60px"}
        icon={<MdOutlineRunningWithErrors />}
      />
      <Stack
        gap={isMobile ? inube.spacing.s200 : inube.spacing.s300}
        width={isMobile ? "312px" : "500px"}
        direction="column"
      >
        <Text
          type={isMobile ? "title" : "headline"}
          size={isMobile ? "medium" : "small"}
          weight="bold"
          textAlign="center"
        >
          ¡Tu sesión ha caducado!
        </Text>
        <Text
          type={isMobile ? "body" : "title"}
          size="medium"
          appearance="gray"
          textAlign="center"
        >
          Parece que has estado inactivo por un tiempo. Por seguridad, hemos
          cerrado automáticamente la sesión.
        </Text>
        <Text
          type={isMobile ? "body" : "title"}
          size="medium"
          appearance="gray"
          textAlign="center"
        >
          Para continuar, por favor inicia sesión nuevamente.
        </Text>
      </Stack>
      <Button
        appearance="primary"
        variant="filled"
        spacing="compact"
        iconBefore={<MdLogin />}
      >
        Iniciar sesión
      </Button>
    </Stack>
  );
}

export { ExpiredSessionPage };
