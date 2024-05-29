import { Text } from "@design/data/Text";
import { Stack } from "@design/layout/Stack";
import { TextField } from "@design/input/TextField";
import { Button } from "@design/input/Button";
import { Divider } from "@design/layout/Divider";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { StyledContainer, StyledResultContainer } from "./styles";

function SwitchUser() {
  /* const urlParams = new URLSearchParams(window.location.search); */ // TEMPS

  const isTablet = useMediaQuery("(max-width: 900px)");
  const isMobile = useMediaQuery("(max-width: 580px)");

  return (
    <StyledContainer isTablet={isTablet} isMobile={isMobile}>
      <Stack direction="column" gap="s400">
        <Stack direction="column" gap="s300">
          <Text
            type={isMobile ? "title" : "headline"}
            size={isMobile ? "medium" : "large"}
          >
            Consulta clientes e información de sus productos
          </Text>
          <Text size={isMobile ? "medium" : "large"} appearance="gray">
            Aquí puedes consultar un cliente mediante su documento de identidad.
            La consulta permite visualizar detalles y productos vigentes.
          </Text>
        </Stack>
        <Stack
          direction={isMobile ? "column" : "row"}
          justifyContent={isMobile ? "center" : "space-between"}
          alignItems={isMobile ? "flex-end" : "center"}
          gap="s200"
        >
          <TextField
            name="searchUser"
            id="searchUser"
            placeholder="Digita el documento de identidad"
            type="number"
            isFullWidth
          />
          <Button>Buscar</Button>
        </Stack>
      </Stack>
      <StyledResultContainer>
        <Stack direction="column" gap="s150" width="100%">
          <Text type="title" size={isMobile ? "small" : "medium"}>
            Resultados de búsqueda
          </Text>
          <Divider dashed />
          <Text appearance="gray" size={isMobile ? "medium" : "large"}>
            Aun no has consultado clientes, para empezar has clic en buscar
          </Text>
        </Stack>
        <Stack direction="column" gap="s150" width="100%">
          <Text type="title" size={isMobile ? "small" : "medium"}>
            Búsquedas recientes
          </Text>
          <Divider dashed />
          <Text appearance="gray" size={isMobile ? "medium" : "large"}>
            No posees búsquedas recientes
          </Text>
        </Stack>
      </StyledResultContainer>
    </StyledContainer>
  );
}

export { SwitchUser };
