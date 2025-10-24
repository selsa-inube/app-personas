import { UserCard } from "@components/cards/UserCard";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import {
  Button,
  Divider,
  Grid,
  Searchfield,
  Stack,
  Text,
} from "@inubekit/inubekit";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AppContext } from "src/context/app";
import { CardsContext } from "src/context/cards";
import { CreditsContext } from "src/context/credits";
import { RequestsContext } from "src/context/requests";
import { SavingsContext } from "src/context/savings";
import { IConsultingUser } from "src/model/entity/user";
import { getConsultingUsers } from "src/services/featureFlags/getConsultingUsers";
import { StyledContainer, StyledResultContainer } from "./styles";
import { getRecentUsers, saveRecentUser } from "./utils";

function SwitchUser() {
  const urlParams = new URLSearchParams(window.location.search);
  const [users, setUsers] = useState<IConsultingUser[]>([]);
  const [filterUsers, setFilterUsers] = useState<IConsultingUser[]>([]);
  const [recentUsers, setRecentUsers] = useState<IConsultingUser[]>([]);
  const [search, setSearch] = useState("");
  const { setUser } = useContext(AppContext);
  const { setCredits } = useContext(CreditsContext);
  const { setSavings, setCommitments } = useContext(SavingsContext);
  const { setRequests } = useContext(RequestsContext);
  const { setCards, setCreditQuotas, setCreditQuotaDetail } =
    useContext(CardsContext);
  const navigate = useNavigate();

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
        user.firstName.toLowerCase().includes(searchLower) ||
        user.lastName.toLowerCase().includes(searchLower),
    );

    setFilterUsers(filterUsers);
  };

  const handleConsultUser = (user: IConsultingUser) => {
    const splitFirstName = user.firstName.split(" ");
    const splitLastName = user.lastName.split(" ");

    setUser((prev) => ({
      ...prev,
      firstName: splitFirstName[0],
      lastName: splitLastName[0],
      identification: user.id,
    }));

    setUser((prev) => ({ ...prev, identification: user.id }));

    saveRecentUser(user);
    setRecentUsers(getRecentUsers());

    setCredits([]);
    setSavings({
      savingsAccounts: [],
      programmedSavings: [],
      savingsContributions: [],
      cdats: [],
    });
    setCommitments([]);
    setRequests([]);
    setCards([]);
    setCreditQuotas([]);
    setCreditQuotaDetail(undefined);

    sessionStorage.setItem("consultingUser", JSON.stringify(user));

    const redirectTo = urlParams.get("redirect_to");
    if (!redirectTo) return;

    navigate(redirectTo);
  };

  const isTablet = useMediaQuery("(max-width: 900px)");
  const isMobile = useMediaQuery("(max-width: 580px)");

  return (
    <StyledContainer $isTablet={isTablet} $isMobile={isMobile}>
      <Stack direction="column" gap={inube.spacing.s400}>
        <Stack direction="column" gap={inube.spacing.s300}>
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
          gap={inube.spacing.s200}
        >
          <Searchfield
            name="searchUser"
            id="searchUser"
            placeholder="Digita el documento de identidad o nombre del cliente"
            fullwidth
            value={search}
            onChange={handleChangeSearch}
          />
          <Button onClick={handleSearchUser}>Buscar</Button>
        </Stack>
      </Stack>
      <StyledResultContainer>
        <Stack direction="column" gap={inube.spacing.s200} width="100%">
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
              gap={inube.spacing.s300}
              autoRows="auto"
              width="100%"
            >
              {filterUsers.map((user) => (
                <UserCard
                  key={user.id}
                  identification={user.id}
                  identificationType={user.identificationType}
                  name={`${user.firstName} ${user.lastName}`}
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
        <Stack direction="column" gap={inube.spacing.s200} width="100%">
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
              gap={inube.spacing.s300}
              autoRows="auto"
              width="100%"
              padding={`0 0 ${inube.spacing.s300} 0`}
            >
              {recentUsers.map((user) => (
                <UserCard
                  key={user.id}
                  identification={user.id}
                  identificationType={user.identificationType}
                  name={`${user.firstName} ${user.lastName}`}
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
