import { IContactChannelsEntry } from "./types";

const mapContactChannels = (contactChannelsData: {
  landlinePhone?: number;
  cellPhone: number;
  email?: string;
}): IContactChannelsEntry => {
  return {
    landlinePhone: contactChannelsData.landlinePhone || "",
    cellPhone: contactChannelsData.cellPhone,
    email: contactChannelsData.email || "",
    acceptNotifications: false,
  };
};

export { mapContactChannels };
