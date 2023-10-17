import { MdOutlineBadge } from "react-icons/md";
import { nav } from "./nav";

const header = {
  logoURL:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbrWOwST-34PyX9rqlHzqEjqunO1PcMzpHJVUIV-7lL4HJ7tcEeNHaj6Redj1lFAOr4Q&usqp=CAU",
  username: "Leonardo Garzón",
  links: [
    {
      title: "links",
      label: "Actualizar datos",
      path: "/update-data",
      icon: <MdOutlineBadge />,
    },
  ],
  portalId: "portal",
  logoutPath: "/",
  logoutTitle: "Cerrar sesión",
  navigation: nav,
};

export { header };
