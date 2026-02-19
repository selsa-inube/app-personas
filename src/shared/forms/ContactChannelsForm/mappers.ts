import { IFullUser } from "src/context/app/types";
import { IContactChannelsEntry } from "./types";

const mapContactChannels = (user: IFullUser): IContactChannelsEntry => {
  if (user.data && user.data.contact && user.data.contact.length > 0) {
    const contactData = user.data?.contact[0];

    return {
      landlinePhone: contactData.landlinePhone || "",
      cellPhone: contactData.cellPhone || "",
      email: contactData.email || "",
      acceptNotifications: false,
    };
  }

  return {
    landlinePhone: "",
    cellPhone: "",
    email: "",
    acceptNotifications: false,
  };
};

export { mapContactChannels };
