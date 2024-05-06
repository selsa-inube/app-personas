import { enviroment } from "@config/enviroment";
import { ITeamsMessageRequest, mapMessageRequestEntityToApi } from "./mappers";

const sendTeamsMessage = async (messageRequest: ITeamsMessageRequest) => {
  try {
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify(mapMessageRequestEntityToApi(messageRequest)),
      mode: "no-cors",
    };

    await fetch(enviroment.TEAMS_WEBHOOK, options);
  } catch (error) {
    console.info(error);

    throw error;
  }
};

export { sendTeamsMessage };
