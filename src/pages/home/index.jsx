import { QuickAccess } from "../../components/cards/QuickAccess";
import { Text } from "../../design/data/Text";
import { Stack } from "../../design/layout/Stack";

import {
  MdAdd,
  MdAttachMoney,
  MdCurrencyExchange,
  MdHistory,
  MdOutlineAccountBalance,
  MdOutlineAddHome,
  MdOutlineCreditScore,
  MdOutlineSavings,
  MdOutlineSupportAgent,
} from "react-icons/md";

import { StyledGrid } from "./styles";
import { Box } from "../../components/cards/Box";
import { inube } from "../../design/tokens";

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
        <Stack direction="column" gap={inube.spacing.s300}>
          <Text type="label">Tus productos</Text>
          <Box
            title="Ahorros"
            subtitle="Consulta tus cuentas"
            icon={<MdOutlineSavings />}
            collapsing={{
              allow: false,
            }}
            button={{
              label: "Solicitar ahorro",
              icon: <MdAdd />,
            }}
          />
          <Box
            title="Créditos"
            subtitle="Consulta tus préstamos"
            icon={<MdOutlineAccountBalance />}
            collapsing={{
              allow: false,
            }}
            button={{
              label: "Solicitar crédito",
              icon: <MdAdd />,
            }}
          />
          <Box
            title="Tarjetas"
            subtitle="Consulta tus compras"
            icon={<MdOutlineCreditScore />}
            collapsing={{
              allow: false,
            }}
            button={{
              label: "Solicitar tarjeta",
              icon: <MdAdd />,
            }}
          />
        </Stack>
        <QuickAccess links={links} />
      </StyledGrid>
    </>
  );
}

export { Home };
