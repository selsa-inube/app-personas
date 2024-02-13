import { MdOutlineBadge } from "react-icons/md";
import { nav } from "./nav";

const header = {
  logoURL:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbrWOwST-34PyX9rqlHzqEjqunO1PcMzpHJVUIV-7lL4HJ7tcEeNHaj6Redj1lFAOr4Q&usqp=CAU",
  username: "Leonardo Garzón",
  links: [
    {
      label: "Actualiza tus datos (Con)",
      path: "/update-data-assisted",
      icon: <MdOutlineBadge />,
    },
    {
      label: "Actualiza tus datos (Sin)",
      path: "/update-data-no-assisted",
      icon: <MdOutlineBadge />,
    },
  ],
  portalId: "portal",
  logoutTitle: "Cerrar sesión",
  navigation: nav,
};

export { header };
