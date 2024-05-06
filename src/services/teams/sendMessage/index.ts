import { enviroment } from "@config/enviroment";
import { ITeamsMessageRequest, mapMessageRequestEntityToApi } from "./mappers";

const sendTeamsMessage = async (messageRequest: ITeamsMessageRequest) => {
  try {
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify(mapMessageRequestEntityToApi(messageRequest)),
      mode: "no-cors",
    };

    const res = await fetch(enviroment.TEAMS_WEBHOOK, options);

    if (!res.ok) {
      throw {
        message: "Error al enviar el mensaje a Teams",
        status: res.status,
      };
    }
  } catch (error) {
    console.info(error);

    throw error;
  }
};

export { sendTeamsMessage };
