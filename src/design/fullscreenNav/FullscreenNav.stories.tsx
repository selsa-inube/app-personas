import { BrowserRouter } from "react-router-dom";
import { themes } from "@mocks/design/themes";
import { ThemeProvider } from "styled-components";
import { FullScreenNav, FullScreenNavProps } from ".";
import { props } from "./props";
import {
  MdOutlineAccountBalance,
  MdOutlineAccountBalanceWallet,
  MdOutlineAirplaneTicket,
  MdOutlineAssignment,
  MdOutlineAttachMoney,
  MdOutlineBadge,
  MdOutlineBalance,
  MdOutlineCreditCard,
  MdOutlineHouse,
  MdOutlineSavings,
  MdOutlineSportsCricket,
} from "react-icons/md";

const story = {
  title: "design/FullscreenNav/FullscreenNav",
  component: FullScreenNav,
  tags: ["autodocs"],
  argTypes: {
    ...props,
  },
  parameters: {
    layout: "fullscreen",
  },
};

export const Default = (args: FullScreenNavProps) => (
  <BrowserRouter>
    <FullScreenNav {...args} />
  </BrowserRouter>
);

Default.args = {
  logoutPath: "/",
  logoutTitle: "Logout",
  portalId: "portal",
  navigation: {
    title: "MENU",
    sections: {
      administrate: {
        name: "ADMINISTRAR",
        links: {
          resumen: {
            id: "resumen",
            label: "Resumen",
            path: "/",
            icon: <MdOutlineHouse />,
          },
          misCuentas: {
            id: "misCuentas",
            label: "Mis cuentas",
            path: "/my-savings",
            icon: <MdOutlineSavings />,
          },
          misInversiones: {
            id: "misInversiones",
            label: "Mis inversiones",
            path: "/my-investments",
            icon: <MdOutlineBalance />,
          },
          misCreditos: {
            id: "misCreditos",
            label: "Mis créditos",
            path: "/my-credits",
            icon: <MdOutlineAccountBalance />,
          },
          misTarjetas: {
            id: "misTarjetas",
            label: "Mis tarjetas",
            path: "/products",
            icon: <MdOutlineCreditCard />,
          },
          misSolicitudes: {
            id: "misSolicitudes",
            label: "Mis solicitudes",
            path: "/products",
            icon: <MdOutlineAssignment />,
          },
        },
      },
      solicitar: {
        name: "SOLICITAR",
        links: {
          ahorros: {
            id: "ahorros",
            label: "Ahorros",
            path: "/credit",
            icon: <MdOutlineAccountBalanceWallet />,
          },
          creditos: {
            id: "creditos",
            label: "Créditos",
            path: "/savings",
            icon: <MdOutlineAttachMoney />,
          },
          eventos: {
            id: "eventos",
            label: "Eventos",
            path: "/holidays",
            icon: <MdOutlineSportsCricket />,
          },
          vacaciones: {
            id: "vacaciones",
            label: "Vacaciones",
            path: "/holidays",
            icon: <MdOutlineAirplaneTicket />,
          },
        },
      },
      links: {
        name: "LINKS",
        links: {
          ahorros: {
            id: "datos",
            label: "Actualización de datos",
            path: "/update-data",
            icon: <MdOutlineBadge />,
          },
        },
      },
    },
  },
};

const theme = {
  ...themes["fondecom"],
};

export const Themed = (args: FullScreenNavProps) => (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <FullScreenNav {...args} />
    </BrowserRouter>
  </ThemeProvider>
);

Themed.args = Default.args;

export default story;
