import { MdOutlineBadge } from "react-icons/md";
import { getNav } from "./nav";

const getHeader = (
  updateDataAssistedFlag: boolean,
  updateDataUnassistedFlag: boolean,
  requestSavingFlag: boolean,
  requestCreditFlag: boolean,
  requestEventFlag: boolean,
  requestAidFlag: boolean,
  requestHolidaysFlag: boolean,
) => {
  const links = [];

  if (updateDataAssistedFlag) {
    links.push({
      label: "Actualiza tus datos (Con)",
      path: "/update-data-assisted",
      icon: <MdOutlineBadge />,
    });
  }

  if (updateDataUnassistedFlag) {
    links.push({
      label: "Actualiza tus datos (Sin)",
      path: "/update-data-unassisted",
      icon: <MdOutlineBadge />,
    });
  }

  return {
    logoURL:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbrWOwST-34PyX9rqlHzqEjqunO1PcMzpHJVUIV-7lL4HJ7tcEeNHaj6Redj1lFAOr4Q&usqp=CAU",
    username: "Leonardo Garzón",
    links,
    portalId: "portal",
    logoutTitle: "Cerrar sesión",
    navigation: getNav(
      requestSavingFlag,
      requestCreditFlag,
      requestEventFlag,
      requestAidFlag,
      requestHolidaysFlag,
    ),
    client: "",
  };
};

export { getHeader };
