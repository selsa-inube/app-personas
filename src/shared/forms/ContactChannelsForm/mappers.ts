import { IContactData } from "src/model/entity/user";
import { IContactChannelsEntry } from "./types";

const mapContactChannels = (
  contactChannelsData: IContactData,
): IContactChannelsEntry => {
  return {
    landlinePhone: contactChannelsData.landlinePhone || "",
    cellPhone: contactChannelsData.cellPhone,
    email: contactChannelsData.email || "",
    acceptDataPolicy: true,
    acceptNotifications: true,
  };
};

export { mapContactChannels };
