import { MdOutlineBadge } from "react-icons/md";
import { IFeaturedFlags } from "src/model/entity/featuredFlag";
import { nav } from "./nav";

const getHeader = (flags?: IFeaturedFlags) => {
  const links = [];

  if (flags && flags["update-data-with-assisted"].value) {
    links.push({
      label: "Actualiza tus datos (Con)",
      path: "/update-data-assisted",
      icon: <MdOutlineBadge />,
    });
  }

  if (flags && flags["update-data-without-assisted"].value) {
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
    navigation: nav,
    client: "",
  };
};

export { getHeader };
