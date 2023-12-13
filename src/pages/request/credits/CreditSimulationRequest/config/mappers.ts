import { IContactData } from "src/model/entity/user";
import { ICommunicationChannelsEntry } from "../forms/CommunicationChannelsForm/types";

const mapCommunicationChannels = (
  communicationChannelsData: IContactData
): ICommunicationChannelsEntry => {
  return {
    landlinePhone: communicationChannelsData.landlinePhone || "",
    cellPhone: communicationChannelsData.cellPhone || "",
    email: communicationChannelsData.email || "",
    acceptDataPolicy: true,
    acceptNotifications: true,
  };
};

export { mapCommunicationChannels };
