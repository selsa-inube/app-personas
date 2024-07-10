import { UserCard } from "@components/cards/UserCard";
import { Text } from "@design/data/Text";
import { Button } from "@design/input/Button";
import { TextField } from "@design/input/TextField";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "src/context/app";
import { IConsultingUser } from "src/model/entity/user";
import { getConsultingUsers } from "src/services/featureFlags/getConsultingUsers";
import { StyledContainer, StyledResultContainer } from "./styles";
import { getRecentUsers, saveRecentUser } from "./utils";
import { Divider } from "@inubekit/divider";

function SwitchUser() {
  const urlParams = new URLSearchParams(window.location.search);
  const [users, setUsers] = useState<IConsultingUser[]>([]);
  const [filterUsers, setFilterUsers] = useState<IConsultingUser[]>([]);
  const [recentUsers, setRecentUsers] = useState<IConsultingUser[]>([]);
  const [search, setSearch] = useState("");
  const { setUser } = useContext(AppContext);

  useEffect(() => {
    getConsultingUsers().then((users) => setUsers(users));
    setRecentUsers(getRecentUsers());
  }, []);

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSearchUser = () => {
    const searchLower = search.toLowerCase();

    const filterUsers = users.filter(
      (user) =>
        user.id.includes(searchLower) ||
        user.name.toLowerCase().includes(searchLower),
    );

    setFilterUsers(filterUsers);
  };

  const handleConsultUser = (user: IConsultingUser) => {
    const splitName = user.name.split(" ");

    setUser((prev) => ({
      ...prev,
      firstLastName: splitName[0] || "",
      secondLastName: splitName[1] || "",
      firstName: splitName[2] || splitName[1] || "",
      secondName: splitName[3] || splitName[2] || "",
      identification: user.id,
    }));

    setUser((prev) => ({ ...prev, identification: user.id }));

    saveRecentUser(user);
    setRecentUsers(getRecentUsers());

    sessionStorage.setItem("consultingUser", JSON.stringify(user));

    const redirectTo = urlParams.get("redirect_to");
    if (!redirectTo) return;

    window.location.replace(redirectTo);
  };

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
            Aquí puedes consultar un cliente mediante su documento de identidad
            o nombre. La consulta permite visualizar detalles y productos
            vigentes.
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
            placeholder="Digita el documento de identidad o nombre del cliente"
            type="text"
            isFullWidth
            value={search}
            onChange={handleChangeSearch}
          />
          <Button onClick={handleSearchUser}>Buscar</Button>
        </Stack>
      </Stack>
      <StyledResultContainer>
        <Stack direction="column" gap="s150" width="100%">
          <Text
            type="title"
            size={isMobile ? "small" : "medium"}
            padding="0 20px"
          >
            Resultados de búsqueda
          </Text>
          <Divider dashed />
          {filterUsers.length > 0 ? (
            <Grid
              templateColumns={`repeat(${isMobile ? 1 : 2}, 1fr)`}
              width="100%"
              gap="s300"
            >
              {filterUsers.map((user) => (
                <UserCard
                  key={user.id}
                  identification={user.id}
                  identificationType={user.identificationType}
                  name={user.name}
                  onClick={() => handleConsultUser(user)}
                />
              ))}
            </Grid>
          ) : (
            <Text
              appearance="gray"
              size={isMobile ? "medium" : "large"}
              padding="0 20px"
            >
              Aun no has consultado clientes, para empezar has clic en buscar
            </Text>
          )}
        </Stack>
        <Stack direction="column" gap="s150" width="100%">
          <Text
            type="title"
            size={isMobile ? "small" : "medium"}
            padding="0 20px"
          >
            Búsquedas recientes
          </Text>
          <Divider dashed />
          {recentUsers.length > 0 ? (
            <Grid
              templateColumns={`repeat(${isMobile ? 1 : 2}, 1fr)`}
              width="100%"
              gap="s300"
            >
              {recentUsers.map((user) => (
                <UserCard
                  key={user.id}
                  identification={user.id}
                  identificationType={user.identificationType}
                  name={user.name}
                  onClick={() => handleConsultUser(user)}
                />
              ))}
            </Grid>
          ) : (
            <Text
              appearance="gray"
              size={isMobile ? "medium" : "large"}
              padding="0 20px"
            >
              No posees búsquedas recientes
            </Text>
          )}
        </Stack>
      </StyledResultContainer>
    </StyledContainer>
  );
}

export { SwitchUser };
