import { QuickAccess } from "../../components/cards/QuickAccess";
import { Text } from "../../design/data/Text";
import { Stack } from "../../design/layout/Stack";

import {
  MdAttachMoney,
  MdCurrencyExchange,
  MdHistory,
  MdOutlineAddHome,
  MdOutlineSupportAgent,
} from "react-icons/md";

import { StyledGrid } from "./styles";

const links = [
  {
    icon: <MdAttachMoney />,
    label: "Paga tus créditos",
    path: "/payments",
  },
  {
    icon: <MdCurrencyExchange />,
    label: "Transferir dinero",
    path: "/transfer",
  },
  {
    icon: <MdHistory />,
    label: "Mis pagos automáticos",
    path: "/debit",
  },
  {
    icon: <MdOutlineAddHome />,
    label: "Abrir CDT",
    path: "/cdt",
  },
  {
    icon: <MdOutlineSupportAgent />,
    label: "Atención en línea",
    path: "/support",
  },
];

function Home() {
  return (
    <>
      <Stack gap="4px" direction="column">
        <Text type="title" as="h1">
          Bienvenido, Leonardo
        </Text>
        <Text type="body" size="medium" color="gray">
          Aquí tienes un resumen de tus productos
        </Text>
      </Stack>
      <StyledGrid>
        <Stack>
          <Text type="label">Tus productos</Text>
        </Stack>
        <QuickAccess links={links} />
      </StyledGrid>
    </>
  );
}

export { Home };
