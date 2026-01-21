import { ITag } from "@inubekit/inubekit";
import {
  MdOutlineAccountBalance,
  MdOutlineCreditScore,
  MdOutlineSavings,
  MdOutlineCalendarMonth
} from "react-icons/md";

const savingsBox = (footerActive = false, footerValue?: string, tags?: ITag[]) => ({
  title: "Ahorros",
  subtitle: "",
  icon: <MdOutlineSavings />,
  navigateTo: "/my-savings",
  collapsing: { start: true, allow: footerActive },
  footer: footerActive ? {
    label: "Total ahorrado",
    value: footerValue
  } : undefined,
  tags
});

const creditsBox = (footerActive = false, footerValue?: string, tags?: ITag[]) => ({
  title: "Créditos",
  icon: <MdOutlineAccountBalance />,
  navigateTo: "/my-credits",
  collapsing: { start: true, allow: footerActive },
  footer: footerActive ? {
    label: "Deuda total",
    value: footerValue
  } : undefined,
  tags
});

const cardsBox = (footerActive = false, footerValue?: string, tags?: ITag[]) => ({
  title: "Tarjetas",
  icon: <MdOutlineCreditScore />,
  navigateTo: "/my-cards",
  collapsing: { start: true, allow: true },
  footer: footerActive ? {
    label: "Deuda total",
    value: footerValue
  } : undefined,
  tags
});

const commitmentsBox = (footerActive = false, footerValue?: string, tags?: ITag[]) => ({
  title: "Compromisos de pago",
  icon: <MdOutlineCalendarMonth />,
  navigateTo: "/my-savings",
  collapsing: { start: true, allow: footerActive },
  footer: footerActive ? {
    label: "Total a pagar",
    value: footerValue
  } : undefined,
  tags
});

export { cardsBox, creditsBox, savingsBox, commitmentsBox };
